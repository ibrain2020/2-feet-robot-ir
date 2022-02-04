input.onButtonPressed(Button.A, function () {
    RobotStatus = START
    basic.showLeds(`
        . # . # .
        . # . # .
        . . . . .
        # # # # #
        . # # # .
        `)
})
input.onButtonPressed(Button.B, function () {
    RobotStatus = STOP
    basic.showLeds(`
        . # . # .
        . # . # .
        . . . . .
        # # # # #
        # # # # #
        `)
    sloth.stand_still()
})
function AutoWalk () {
    Distance = sonar.ping(
    DigitalPin.P12,
    DigitalPin.P13,
    PingUnit.Centimeters
    )
    if (Distance >= 15) {
        sloth.do_action(sloth.actions(sloth.action_name.walk), 1, SpeedFwd)
    } else {
        sloth.do_action(sloth.actions(sloth.action_name.swing), 2, SpeedBack)
        sloth.do_action(sloth.actions(sloth.action_name.walk_backward_boldly), 1, SpeedBack)
        sloth.do_action(sloth.actions(sloth.action_name.walk_backward), 1, SpeedBack)
        sloth.do_action(sloth.actions(sloth.action_name.walk_backward_shyly), 1, SpeedBack)
        basic.pause(200)
        if (sloth.obstacle_detected()) {
            sloth.do_action(sloth.actions(sloth.action_name.shake_right), 1, SpeedLR)
            sloth.do_action(sloth.actions(sloth.action_name.turn_right), 1, SpeedLR)
            sloth.do_action(sloth.actions(sloth.action_name.moonwalk_right), 1, SpeedLR)
        } else {
            sloth.do_action(sloth.actions(sloth.action_name.shake_left), 1, SpeedLR)
            sloth.do_action(sloth.actions(sloth.action_name.turn_left), 1, SpeedLR)
            sloth.do_action(sloth.actions(sloth.action_name.moonwalk_left), 1, SpeedLR)
        }
    }
}
let Distance = 0
let SpeedLR = 0
let SpeedBack = 0
let SpeedFwd = 0
let RobotStatus = 0
let START = 0
let STOP = 0
STOP = 0
START = 1
RobotStatus = STOP
SpeedFwd = 50
SpeedBack = 50
SpeedLR = 50
basic.showIcon(IconNames.Heart)
basic.forever(function () {
    if (RobotStatus == START) {
        AutoWalk()
    }
})
