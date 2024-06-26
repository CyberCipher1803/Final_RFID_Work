function WelcomeSign() {
    if (serial.readString() == fob) {
        basic.showString("Welcome")
    } else {
        basic.showIcon(IconNames.Sad)
    }
    
}

function ServoTurnLong() {
    pins.servoWritePin(AnalogPin.P16, 180)
    basic.pause(2000)
    pins.servoWritePin(AnalogPin.P16, 0)
}

function allOff() {
    pins.servoWritePin(AnalogPin.P16, 0)
    pins.setAudioPinEnabled(false)
}

function Buzzer() {
    pins.setAudioPin(AnalogPin.P8)
    pins.setAudioPinEnabled(true)
    music.ringTone(262)
    music.rest(music.beat(BeatFraction.Half))
    music.ringTone(262)
    basic.pause(2000)
    music.stopAllSounds()
}

function ServoTurnShort() {
    pins.servoWritePin(AnalogPin.P16, 180)
    basic.pause(500)
    pins.servoWritePin(AnalogPin.P16, 0)
    basic.pause(500)
}

function WrongBuzzer() {
    pins.setAudioPin(AnalogPin.P8)
    pins.setAudioPinEnabled(true)
    music.ringTone(554)
    music.rest(music.beat(BeatFraction.Half))
    music.ringTone(554)
    basic.pause(2000)
    music.stopAllSounds()
}

let fob = ""
serial.redirect(SerialPin.P0, SerialPin.P1, BaudRate.BaudRate9600)
fob = "0796AEA56D57"
ServoTurnShort()
basic.forever(function on_forever() {
    if (serial.readString() == fob) {
        ServoTurnLong()
        Buzzer()
        WelcomeSign()
        basic.pause(5000)
        ServoTurnShort()
    } else if (serial.readString() != fob) {
        WrongBuzzer()
        WelcomeSign()
    } else {
        allOff()
        WrongBuzzer()
    }
    
})
