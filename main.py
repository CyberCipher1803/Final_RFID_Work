def ServoTurnLong():
    pins.servo_write_pin(AnalogPin.P16, 180)
    basic.pause(2000)
    pins.servo_write_pin(AnalogPin.P16, 0)
def allOff():
    pins.servo_write_pin(AnalogPin.P16, 0)
    pins.set_audio_pin_enabled(False)
def Buzzer():
    pins.set_audio_pin(AnalogPin.P8)
    pins.set_audio_pin_enabled(True)
    music.ring_tone(262)
    music.rest(music.beat(BeatFraction.HALF))
    music.ring_tone(262)
def ServoTurnShort():
    pins.servo_write_pin(AnalogPin.P16, 180)
    basic.pause(500)
    pins.servo_write_pin(AnalogPin.P16, 0)
    basic.pause(500)
serial.redirect(SerialPin.P0, SerialPin.P1, BaudRate.BAUD_RATE9600)
fob = "0796AEA56D57"
ServoTurnShort()

def on_forever():
    if serial.read_string() == fob:
        ServoTurnLong()
basic.forever(on_forever)
