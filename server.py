from flask import Flask,render_template,request,redirect,flash
import pymongo
client=pymongo.MongoClient()
Quantity_Table=client.Quantity_database
Quantity=Quantity_Table.Table
Log_Table=client.Log_database
Log=Log_Table.Table
Quantity.drop()
Log.drop()
page=Flask(__name__)
page.config['SECRET_KEY'] = 'super secret key'
Quantity.insert_one({'name':'A','quantity':5})
Quantity.insert_one({'name':'B','quantity':15})
Quantity.insert_one({'name':'C','quantity':15})
Quantity.insert_one({'name':'D','quantity':15})
@page.route("/",methods =["GET","POST"])
def refill_a():
    log=[]
    for document in Log.find():
        log.append(document)
    return render_template("index.html",log=log)
@page.route("/refill_a",methods =["GET"])
def gfga():
    Quantity.delete_one({'name':'A'})
    Quantity.insert_one({'name':'A','quantity':15})
    return '200'
@page.route("/refill_b",methods =["GET"])
def gfgb():
    Quantity.delete_one({'name':'B'})
    Quantity.insert_one({'name':'B','quantity':15})
    return '200'
@page.route("/refill_c",methods =["GET"])
def gfgc():
    Quantity.delete_one({'name':'C'})
    Quantity.insert_one({'name':'C','quantity':15})
    return '200'
@page.route("/refill_d",methods =["GET"])
def gfgd():
    Quantity.delete_one({'name':'D'})
    Quantity.insert_one({'name':'D','quantity':15})
    return '200'
@page.route("/logA",methods =["GET","POST"])
def logA():
    log=[]
    for document in Log.find({'medicine':'A'}):
        log.append(document)
    return render_template('table.html',log=log)
@page.route("/logB",methods =["GET","POST"])
def logB():
    log=[]
    for document in Log.find({'medicine':'B'}):
        log.append(document)
    return render_template('table.html',log=log)
@page.route("/logC",methods =["GET","POST"])
def logC():
    log=[]
    for document in Log.find({'medicine':'C'}):
        log.append(document)
    return render_template('table.html',log=log)
@page.route("/logD",methods =["GET","POST"])
def logD():
    log=[]
    for document in Log.find({'medicine':'D'}):
        log.append(document)
    return render_template('table.html',log=log)
@page.route("/update",methods =["GET"])
def update():
    log=[]
    medicin_1=Quantity.find_one({'name':'A'})['quantity']
    medicin_2=Quantity.find_one({'name':'B'})['quantity']
    medicin_3=Quantity.find_one({'name':'C'})['quantity']
    medicin_4=Quantity.find_one({'name':'D'})['quantity']
    output=[medicin_1,medicin_2,medicin_3,medicin_4]
    return str(output)
    
if __name__ == '__main__':
    page.run(host='0.0.0.0',debug=True,port=5000)