// tests go here; this will not be compiled when this package is used as a library

OLED.init(128, 64)
OLED.clear()
OLED.drawLine(0, 0, 127, 63)
OLED.drawLine(0, 63, 127, 0)
OLED.drawRectangle(10, 20, 60, 30)
