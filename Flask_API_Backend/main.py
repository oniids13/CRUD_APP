from flask import Flask, jsonify, render_template, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy import Integer, String, Boolean

app = Flask(__name__)

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


def validate_item(data):
    if not data.get('name'):
        return 'Name is required.'

    if 'price' not in data or not isinstance(data['price'], (int, float)) or data['price'] <= 0:
        return 'Price must be a positive number.'

    return None



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
    new_item = Items(
        name=request.form.get("name"),
        description=request.form.get("description"),
        price=request.form.get("price"),
    )

    db.session.add(new_item)
    db.session.commit()
    return jsonify(response={"success": "Successfully added the new item"})

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
    if item_update:
        item_update.name = request.args.get("name")
        item_update.description = request.args.get("description")
        item_update.price =request.args.get("price")
        db.session.commit()
        return jsonify(response={"success": "Successfully updated the item."}), 200
    else:
        return jsonify(error={"Not Found": "Sorry the item with that id was not found in the database"}), 404

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