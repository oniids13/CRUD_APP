from flask import Flask, jsonify, render_template, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy import Integer, String, Boolean
from flask_cors import CORS


app = Flask(__name__)
# cross-origin resource sharing
CORS(app)

# CREATE DB
class Base(DeclarativeBase):
    pass
# Connect to Database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///items.db'
db = SQLAlchemy(model_class=Base)
db.init_app(app)


# Cafe TABLE Configuration
class Items(db.Model):
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(250), unique=True, nullable=False)
    description: Mapped[str] = mapped_column(String(250), nullable=False)
    price: Mapped[float] = mapped_column(Integer, nullable=False)


    def to_dict(self):
        dictionary = {}
        for column in self.__table__.columns:
            dictionary[column.name] = getattr(self, column.name)
        return dictionary



with app.app_context():
    db.create_all()

@app.route('/')
def home():
    return render_template("index.html")

@app.route("/api/items", methods=['GET'])
def get_all_items():
    result = db.session.execute(db.select(Items))
    all_items = result.scalars().all()
    return jsonify(item=[item.to_dict() for item in all_items])

@app.route('/api/items', methods=['POST'])
def add_item():

    if not request.form.get("name") or not request.form.get("description"):
        return jsonify({"error": "Please enter data"}), 400

    if not request.form.get("price") or int(request.form.get("price")) <= 0:
        return jsonify({"error": "Price must be positive integer"}), 400

    new_item = Items(
        name=request.form.get("name"),
        description=request.form.get("description"),
        price=request.form.get("price"),
    )

    db.session.add(new_item)
    db.session.commit()
    return jsonify(response={"Success": "Successfully added the new item"})

@app.route('/api/items/<int:item_id>', methods=["GET"])
def view_item(item_id):
    result = db.session.execute(db.select(Items).where(Items.id == item_id))
    item = result.scalar()
    if item:
        return jsonify(item=item.to_dict())
    else:
        return jsonify(error={"Not Found": "Sorry, we don't have that item"})


@app.route('/api/items/<int:item_id>', methods=["PUT"])
def update_item(item_id):
    item_update = db.get_or_404(Items, item_id)

    data = request.get_json()
    name = data.get("name")
    description = data.get("description")
    price = data.get("price")

    if not name or not description:
        return jsonify({"error": "Please enter data"}), 400

    if not price or int(price) <= 0:
        return jsonify({"error": "Price must be positive integer"}), 400


    item_update.name = name
    item_update.description = description
    item_update.price = price
    db.session.commit()

    return jsonify(response={"Success": "Successfully updated the item."}), 200



@app.route('/api/items/<int:item_id>', methods=['DELETE'])
def delete_item(item_id):
    delete_item = db.get_or_404(Items, item_id)
    if delete_item:
        db.session.delete(delete_item)
        db.session.commit()
        return jsonify(response={"Success": "Item Deleted"}), 200
    else:
        return jsonify(error={"Not Found": "Sorry, a cafe with that id was not found in the database."}), 404


if __name__ == '__main__':
    app.run(debug=True)