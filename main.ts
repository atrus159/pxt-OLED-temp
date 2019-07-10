namespace OLED {

    const SSD1306_SETCONTRAST = 0x81
    const SSD1306_SETCOLUMNADRESS = 0x21
    const SSD1306_SETPAGEADRESS = 0x22
    const SSD1306_DISPLAYALLON_RESUME = 0xA4
    const SSD1306_DISPLAYALLON = 0xA5
    const SSD1306_NORMALDISPLAY = 0xA6
    const SSD1306_INVERTDISPLAY = 0xA7
    const SSD1306_DISPLAYOFF = 0xAE
    const SSD1306_DISPLAYON = 0xAF
    const SSD1306_SETDISPLAYOFFSET = 0xD3
    const SSD1306_SETCOMPINS = 0xDA
    const SSD1306_SETVCOMDETECT = 0xDB
    const SSD1306_SETDISPLAYCLOCKDIV = 0xD5
    const SSD1306_SETPRECHARGE = 0xD9
    const SSD1306_SETMULTIPLEX = 0xA8
    const SSD1306_SETLOWCOLUMN = 0x00
    const SSD1306_SETHIGHCOLUMN = 0x10
    const SSD1306_SETSTARTLINE = 0x40
    const SSD1306_MEMORYMODE = 0x20
    const SSD1306_COMSCANINC = 0xC0
    const SSD1306_COMSCANDEC = 0xC8
    const SSD1306_SEGREMAP = 0xA0
    const SSD1306_CHARGEPUMP = 0x8D

    const chipAdress = 0x3C
    const xOffset = 0x00
    const yOffset = 0x00

    let charX = xOffset
    let charY = yOffset
    let displayWidth = 128
    let displayHeight = 64

    function command(cmd: number) {
        let buf = pins.createBuffer(1)
        buf[0] = cmd
        pins.i2cWriteBuffer(chipAdress, buf, false)
    }

    function clear() {
        let buf = pins.createBuffer(3)
        buf[0] = SSD1306_SETCOLUMNADRESS
        buf[1] = 0x00
        buf[2] = displayWidth - 1
        pins.i2cWriteBuffer(chipAdress, buf, false)
        buf[0] = SSD1306_SETPAGEADRESS
        buf[1] = 0x00
        buf[2] = displayHeight - 1
        pins.i2cWriteBuffer(chipAdress, buf, false)

        let data = pins.createBuffer(1)
        for (let i = 0; i < displayWidth / 8; i++) {
            for (let j = 0; j < displayHeight / 8; j++) {
                data[0] = 0x00
                let endWidth = (i === (displayWidth / 8) - 1)
                let endHeight = (j === (displayHeight / 8) - 1)
                pins.i2cWriteBuffer(chipAdress, buf, !endWidth || !endHeight)
            }
        }
        charX = xOffset
        charY = yOffset
    }

    export function init(width: number, height: number) {


        command(SSD1306_DISPLAYOFF);
        command(SSD1306_SETDISPLAYCLOCKDIV);
        command(0x80);                                  // the suggested ratio 0x80

        command(SSD1306_SETMULTIPLEX);
        command(0x3F);

        command(SSD1306_SETDISPLAYOFFSET);
        command(0x0);                                   // no offset

        command(SSD1306_SETSTARTLINE | 0x0);            // line #0

        command(SSD1306_CHARGEPUMP);
        command(0x14);

        command(SSD1306_MEMORYMODE);
        command(0x00);                                  // 0x0 act like ks0108

        command(SSD1306_SEGREMAP | 0x1);

        command(SSD1306_COMSCANDEC);

        command(SSD1306_SETCOMPINS);
        command(0x12);

        command(SSD1306_SETCONTRAST);
        command(0xCF);

        command(SSD1306_SETPRECHARGE);
        command(0xF1);

        command(SSD1306_SETVCOMDETECT);
        command(0x40);

        command(SSD1306_DISPLAYALLON_RESUME);

        command(SSD1306_NORMALDISPLAY);

        command(SSD1306_DISPLAYON);

        displayWidth = width
        displayHeight = height
        clear()

    }
} 