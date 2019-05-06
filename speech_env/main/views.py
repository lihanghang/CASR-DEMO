from flask import Flask
from . import main


@main.route("/")
def index():
	return render_template("index.html")