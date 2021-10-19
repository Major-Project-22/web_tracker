import RPi.GPIO  as GPIO

import time,pymongo,datetime

client=pymongo.MongoClient()

Quantity_Table=client.Quantity_database

Quantity=Quantity_Table.Table

Log_Table=client.Log_database

Log=Log_Table.Table

GPIO.setmode(GPIO.BOARD)

GPIO.setup(13,GPIO.OUT)

GPIO.setup(11,GPIO.OUT)

GPIO.setup(15,GPIO.OUT)

GPIO.setup(16,GPIO.OUT)

GPIO.setup(22,GPIO.IN)

GPIO.setup(31,GPIO.IN)

GPIO.setup(29,GPIO.IN)

GPIO.setup(36,GPIO.IN)

Quantity.drop()

Log.drop()

Quantity.insert_many([{'name':'A','quantity':15},{'name':'B','quantity':15},{'name':'C','quantity':15},{'name':'D','quantity':15}])

duty=5

class Dispenser():

    def __init__(self,ir,servo,name):

        self.name=name

        self.ir=ir

        self.servo=servo

    def dispense(self):

        global duty

        servo_output=GPIO.PWM(self.servo,50)

        while True:

            ir_sensor=GPIO.input(self.ir)

            if ir_sensor==0:

                servo_output.start(5)

                while duty<8:

                    servo_output.ChangeDutyCycle(duty)

                    time.sleep(0.1)

                    print(duty)

                    duty=duty+1

                while duty>5:

                    servo_output.ChangeDutyCycle(duty)  

                    time.sleep(0.1)

                    duty=duty-1

                    print(duty)

                number=Quantity.find_one({'name':self.name})['quantity']

                Quantity.delete_one({'name':self.name})

                Quantity.insert_one({'name':self.name,'quantity':number-1})

                Log.insert_one({'medicine':self.name,'time':datetime.datetime.now()})

                break;

A=Dispenser(ir=22,servo=11,name="A")

C=Dispenser(ir=31,servo=15,name="C")

while True:

    inc=int(input("Enter the number to Dispense the medicine, or 0 to exit"))

    if inc==1:

        A.dispense()

    elif inc==2:

        C.dispense()

    elif inc==0:

        break;    



