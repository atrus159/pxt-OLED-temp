// tests go here; this will not be compiled when this package is used as a library

OLED.init(128, 64)
OLED.clear(false)
OLED.writeString("there's a number after this:")
OLED.writeNum(26)
OLED.writeString("foo bar")
OLED.newLine()
OLED.writeStringNewLine("This should all be on one line.")
OLED.writeNumNewLine(69)
