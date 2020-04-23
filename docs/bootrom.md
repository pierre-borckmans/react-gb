# Logo

CE ED 66 66 CC 0D 00 0B 03 73 00 83 00 0C 00 0D
00 08 11 1F 88 89 00 0E DC CC 6E E6 DD DD D9 99
BB BB 67 63 6E 0E EC CC DD DC 99 9F BB B9 33 3E

https://www.ngemu.com/threads/how-to-decode-the-nintendo-logo-from-gameboy.159631/

```
foreach uint8_t d in logo_data

   // unpack horizontal data,
   // i.e. double each bit
   uint16_t hor_unpacked = 0x00u
   foreach uint1_t b in d (b7 --> b0)
     hor_unpacked <<= 1;
     hor_unpacked |= b;
     hor_unpacked <<= 1;
     hor_unpacked |= b;
   end

   // unpack vertical data and upscale to 2 bpp
   destination++ = (hor_unpacked >> 8) & 0xFFu;
   destination++ = 0x00u;
   destination++ = (hor_unpacked >> 8) & 0xFFu;
   destination++ = 0x00u;

   destination++ = hor_unpacked & 0xFFu;
   destination++ = 0x00u;
   destination++ = hor_unpacked & 0xFFu;
   destination++ = 0x00u;
end
```

CE = 11001110

unpacked=0000000000000000

unpacked=0000000000000000
unpacked=0000000000000001
unpacked=0000000000000010
unpacked=0000000000000011

unpacked=0000000000000110
unpacked=0000000000000111
unpacked=0000000000001110
unpacked=0000000000001111
...
unpacked=1111000011111100

destination(0)=11110000=F0
destination(1)=00000000=00
destination(2)=11110000=F0
destination(3)=00000000=00
destination(4)=11111100=FC
destination(5)=00000000=00
destination(6)=11111100=FC
destination(7)=00000000=00

ED=11101101
destination(8)=11111100=FC
destination(9)=00000000=00
destination(a)=11111100=FC
destination(b)=00000000=00
destination(c)=11110011=F3
destination(d)=00000000=00
destination(e)=11110011=F3
destination(f)=00000000=00
