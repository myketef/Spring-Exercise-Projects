from app import app
from models import db, Cupcake

db.drop_all()
db.create_all()

c1 = Cupcake(
    flavor="moist chocolate",
    size="large",
    rating=9.9,
    image="https://sallysbakingaddiction.com/wp-content/uploads/2017/06/moist-chocolate-cupcakes-5.jpg"
)

c2 = Cupcake(
    flavor="vanilla",
    size="small",
    rating=5.1
)

c3 = Cupcake(
    flavor="butter cup",
    size="medium",
    rating=7
)

db.session.add_all([c1, c2, c3])
db.session.commit()