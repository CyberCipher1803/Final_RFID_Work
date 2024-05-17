function ServoTurnLong () {
    pins.servoWritePin(AnalogPin.P16, 180)
    basic.pause(2000)
    pins.servoWritePin(AnalogPin.P16, 0)
}
function allOff () {
    pins.servoWritePin(AnalogPin.P16, 0)
    pins.setAudioPinEnabled(false)
}
function Buzzer () {
    pins.setAudioPin(AnalogPin.P8)
    pins.setAudioPinEnabled(true)
    music.ringTone(262)
    music.rest(music.beat(BeatFraction.Half))
    music.ringTone(262)
}
function ServoTurnShort () {
    pins.servoWritePin(AnalogPin.P16, 180)
    basic.pause(500)
    pins.servoWritePin(AnalogPin.P16, 0)
    basic.pause(500)
}
serial.redirect(
SerialPin.P0,
SerialPin.P1,
BaudRate.BaudRate9600
)
let fob = "0796AEA56D57"
ServoTurnShort()
basic.forever(function () {
    if (serial.readString() == fob) {
        ServoTurnLong()
    }
})
