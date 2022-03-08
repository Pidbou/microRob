function SetL293in (num: number, num2: number, num3: number, num4: number) {
    pins.digitalWritePin(DigitalPin.P13, num)
    pins.digitalWritePin(DigitalPin.P14, num2)
    pins.digitalWritePin(DigitalPin.P15, num3)
    pins.digitalWritePin(DigitalPin.P16, num4)
}
function SetMotor2Speed (speed: number) {
    if (speed < 0) {
        pins.digitalWritePin(DigitalPin.P15, 1)
        pins.digitalWritePin(DigitalPin.P16, 0)
    } else if (speed > 0) {
        pins.digitalWritePin(DigitalPin.P15, 0)
        pins.digitalWritePin(DigitalPin.P16, 1)
    } else {
        pins.digitalWritePin(DigitalPin.P15, 0)
        pins.digitalWritePin(DigitalPin.P16, 0)
    }
    pins.analogWritePin(AnalogPin.P2, Math.round(Math.abs(speed) / 100 * 1023))
}
function SetMotor1Speed (speed: number) {
    if (speed < 0) {
        pins.digitalWritePin(DigitalPin.P13, 1)
        pins.digitalWritePin(DigitalPin.P14, 0)
    } else if (speed > 0) {
        pins.digitalWritePin(DigitalPin.P13, 0)
        pins.digitalWritePin(DigitalPin.P14, 1)
    } else {
        pins.digitalWritePin(DigitalPin.P13, 0)
        pins.digitalWritePin(DigitalPin.P14, 0)
    }
    pins.analogWritePin(AnalogPin.P1, Math.round(Math.abs(speed) / 100 * 1023))
}
radio.onReceivedValue(function (name, value) {
    if (name == "Pitch") {
        fwd = value * (-50 / 90)
    }
    if (name == "Roll") {
        turnR = value * (20 / 90)
    }
})
let fwd = 0
let turnR = 0
radio.setGroup(1)
turnR = 0
fwd = 0
basic.forever(function () {
    SetMotor1Speed(fwd + turnR)
    SetMotor2Speed(fwd - turnR)
})
