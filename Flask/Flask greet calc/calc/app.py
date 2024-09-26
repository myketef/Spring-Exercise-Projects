from flask import Flask, request
from operations import add, sub, mult, div

app = Flask(__name__)

@app.route("/add")
def add():
    """Add a and b."""
    a = int(request.args["a"])
    b = int(request.args["b"])
    sum = add(a, b)
    return str(sum)

@app.route("/sub")
def sub():
    """Substract b from a."""
    a = int(request.args["a"])
    b = int(request.args["b"])
    result = sub(a, b)
    return str(result)

@app.route("/mult")
def mult():
    """Multiply a and b."""
    a = int(request.args["a"])
    b = int(request.args["b"])
    prod = mult(a, b)
    return str(prod)

@app.route("/div")
def div():
    """Divide a by b."""
    a = int(request.args["a"])
    b = int(request.args["b"])
    div = div(a, b)
    return str(div)

# PART TWO
@app.route("/math/<operation>")
def do_math(operation):
    """Do math on a and b."""
    a = int(request.args.get("a"))
    b = int(request.args.get("b"))
    operators = {"add": add(a, b),
            "sub": sub(a, b),
            "mult": mult(a, b),
            "div": div(a, b)
            }
    
    return f"{operators[operation]}"

