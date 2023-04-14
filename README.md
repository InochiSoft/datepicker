# INOCHI DatePicker

JQuery DatePicker Kalender Indonesia dengan tampilan hari libur dan cuti bersama
## Penggunaan
```html
<!DOCTYPE html>
<html>
<head>
  ...
  <!-- ##Tambahkan Pustaka JQuery -->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
  <!-- ##Tambahkan Pustaka JQuery -->

  <!-- ##Tambahkan Pustaka INOCHI DatePicker -->
  <script src='js/idtpicker.js'></script>
  <!-- ##Tambahkan Pustaka INOCHI DatePicker -->
  ...
</head>
<body>
  <input type="text" id="dtpicker1" name="dtpicker1" />
  <br/>
  <input type="text" id="dtpicker2" name="dtpicker2" />
  <br/>
  <script type="text/javascript">
    $(document).ready(function() {
      /* Menambahkan hari libur */
      const addHolidays = [
        {
          date: '2023-09-09',
          name: 'Ulang Tahun'
        },
        {
          date: '2024-09-09',
          name: 'Ulang Tahun'
        }
      ];

      /* Menambahkan cuti bersama */
      const addLeaves = [
        {
          date: '2023-04-19',
          name: 'idul_fitri',
          age: '1444',
        },
        {
          date: '2023-04-20',
          name: 'Hari Raya Idul Fitri 1444'
        },
      ];

      /* Menghapus hari libur */
      const remHolidays = [
        {
          date: '2023-01-01'
        }
      ];

      /* Menghapus cuti bersama */
      const remLeaves = [
        {
          date: '2023-04-25'
        }
      ];

      /* Inisialisasi INOCHI DatePicker dengan opsi kustom */
      $("#dtpicker1").inochiDTPicker({
        calendarOptions: {
          timezone: 7,
          latitude: -6.9128,
          longitude: 107.6206,
          altitude: 10,
          weeklyFormat: true,
          include: {
            addHolidays,
            addLeaves,
            remHolidays,
            remLeaves,
          }
        }
      });

      /* Inisialisasi INOCHI DatePicker dengan opsi bawaan */
      $("#dtpicker2").inochiDTPicker();
    });
  </script>
</body>
</html>
```
## Situs Web
[![KalenderIndonesia.Com][kalender-indonesia-banner]][kalender-indonesia-url]
[KalenderIndonesia.Com]([kalender-indonesia-url])

## Pengembang
[Agung Novian](mailto:pujanggabageur@gmail.com)

## Donasi
**PayPal**: [![PayPal](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://paypal.me/novian)

Crypto:

**ETH (ERC20)/BNB (BEP20)**: 0x12c930700efe92d466fece53eac424410b56f29a

**BTC**: 1NfrjEq4Ac6gTmcnAkEraFrAwoQ6MKQ4B8

Bank:

**BCA**: 8105216927

[npm-install-size-image]: https://badgen.net/packagephobia/install/kalender-indonesia
[npm-install-size-url]: https://packagephobia.com/result?p=kalender-indonesia
[npm-url]: https://npmjs.org/package/kalender-indonesia
[npm-version-image]: https://badgen.net/npm/v/kalender-indonesia
[npm-downloads-image]: https://badgen.net/npm/dm/kalender-indonesia
[npm-downloads-url]: https://npmcharts.com/compare/kalender-indonesia?minimal=true
[kalender-indonesia-banner]: https://kalenderindonesia.com/image/big-banner/year/month.png
[kalender-indonesia-url]: https://kalenderindonesia.com
