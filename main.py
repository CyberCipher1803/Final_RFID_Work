def WelcomeSign():
    if serial.read_string() == fob:
        basic.show_string("Welcome")
    else:
        basic.show_icon(IconNames.SAD)
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
    basic.pause(2000)
    music.stop_all_sounds()
def ServoTurnShort():
    pins.servo_write_pin(AnalogPin.P16, 180)
    basic.pause(500)
    pins.servo_write_pin(AnalogPin.P16, 0)
    basic.pause(500)
def WrongBuzzer():
    pins.set_audio_pin(AnalogPin.P8)
    pins.set_audio_pin_enabled(True)
    music.ring_tone(554)
    music.rest(music.beat(BeatFraction.HALF))
    music.ring_tone(554)
    basic.pause(2000)
    music.stop_all_sounds()
fob = ""
serial.redirect(SerialPin.P0, SerialPin.P1, BaudRate.BAUD_RATE9600)
fob = "0796AEA56D57"
ServoTurnShort()

def on_forever():
    if serial.read_string() == fob:
        ServoTurnLong()
        Buzzer()
        WelcomeSign()
        basic.pause(5000)
        ServoTurnShort()
    elif serial.read_string() != fob:
        WrongBuzzer()
        WelcomeSign()
    else:
        allOff()
        WrongBuzzer()
basic.forever(on_forever)
