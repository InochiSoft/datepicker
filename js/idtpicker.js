/*
------------- Create by Agung Novian -----------------------
*/
"use strict";
var intVal = function (mixedVar, base) {
	if (base === void 0) { base = 10; }
	var tmp;
	var match;
	var type = typeof mixedVar;
	if (type === 'boolean') {
		return +mixedVar;
	}
	else if (type === 'string') {
		if (base === 0) {
			match = mixedVar.match(/^\s*0(x?)/i);
			base = match ? (match[1] ? 16 : 8) : 10;
		}
		tmp = parseInt(mixedVar, base || 10);
		return isNaN(tmp) || !isFinite(tmp) ? 0 : tmp;
	}
	else if (type === 'number' && isFinite(mixedVar)) {
		return mixedVar < 0 ? Math.ceil(mixedVar) : Math.floor(mixedVar);
	}
	else {
		return 0;
	}
};
var strPos = function (haystack, needle, offset) {
	if (offset === void 0) { offset = 0; }
	var i = (haystack + '').indexOf(needle, offset || 0);
	return i === -1 ? false : i;
};
var isNumeric = function (n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
};
var daysInMonth = function (month, year) {
	return month === 2 ? (year % 4 ? 28 : year % 100 ? 29 : year % 400 ? 28 : 29) : ((month - 1) % 7) % 2 ? 30 : 31;
};
var intPart = function (floatNum) {
	if (floatNum < -0.0000001) {
		return floatNum - 0.0000001;
	}
	return (0, intVal)(floatNum + 0.0000001);
};
var roundUp = function (dblValue) {
	var myDec = (0, strPos)(dblValue.toString(), '.');
	var strValue;
	if (myDec === false) {
		strValue = dblValue;
	}
	else {
		var arrSplit = dblValue.toString().split('.');
		strValue = (0, intVal)(arrSplit[0]) + 1;
	}
	return strValue;
};
var mod = function (val1, val2) {
	return val1 - val2 * (0, intVal)(val1 / val2);
};
var ceiling = function (val, significance) {
	if (significance === void 0) { significance = 1; }
	return (0, isNumeric)(val) && (0, isNumeric)(significance) ? Math.ceil(val / significance) * significance : false;
};
var trunc = function (value) {
	if (value === 0)
		return 0;
	var strValue;
	var myDec = (0, strPos)(value.toString(), '.');
	if (myDec === false) {
		myDec = (0, strPos)(value.toString(), ',');
		if (myDec === false) {
			strValue = value;
		}
		else {
			var $arrSplit = value.toString().split(',');
			strValue = $arrSplit[0];
		}
	}
	else {
		var $arrSplit = value.toString().split('.');
		strValue = $arrSplit[0];
	}
	return (0, intVal)(strValue);
};
var round = function (num, dec) {
	var numSign = num >= 0 ? 1 : -1;
	return parseFloat((Math.round(num * Math.pow(10, dec) + numSign * 0.0001) / Math.pow(10, dec)).toFixed(dec));
};
var isDecimal = function (val) {
	return (0, isNumeric)(val) && Math.floor(val) !== val;
};
var leftPad = function (value, len) {
	var output = value + '';
	while (output.length < len) {
		output = '0' + output;
	}
	return output;
};
var formatReadDate = function (year, month, day) {
	return [year, ('0' + month).slice(-2), ('0' + day).slice(-2)].join('-');
};
var formatReadTime = function (date) {
	return [
		('0' + date.getHours()).slice(-2),
		('0' + date.getMinutes()).slice(-2),
		('0' + date.getSeconds()).slice(-2),
	].join(':');
};
var convertDate = function (date) {
	var arrDate = date.split('-');
	var dDay = (0, intVal)(arrDate[2]);
	var dMonth = (0, intVal)(arrDate[1]);
	var dYear = (0, intVal)(arrDate[0]);
	var newYear = dYear;
	var addYear = 0;
	var addMultiply = 0;
	if (dYear >= 2038) {
		addMultiply = (0, intVal)((dYear - 1982) / 56);
		addYear = addMultiply * 56;
		newYear = dYear - addYear;
	}
	return (0, formatReadDate)(newYear, dMonth, dDay);
};
var daysBetween = function (date1, date2) {
	var arrStartDate = date1.split('-');
	var dStartDay = (0, intVal)(arrStartDate[2]);
	var dStartMonth = (0, intVal)(arrStartDate[1]);
	var dStartYear = (0, intVal)(arrStartDate[0]);
	var arrEndDate = date2.split('-');
	var dEndDay = (0, intVal)(arrEndDate[2]);
	var dEndMonth = (0, intVal)(arrEndDate[1]);
	var dEndYear = (0, intVal)(arrEndDate[0]);
	if (dEndYear >= 2038) {
		var addMultiplyEnd = (0, intVal)((dEndYear - 1982) / 56);
		var addYearEnd = addMultiplyEnd * 56;
		dEndYear -= addYearEnd;
	}
	if (dStartYear === 2037) {
		if (dEndYear === 2038 || dEndYear === 1982) {
			dStartYear = 1981;
		}
	}
	var startDate = "".concat(dStartYear, "-").concat(dStartMonth, "-").concat(dStartDay);
	var endDate = "".concat(dEndYear, "-").concat(dEndMonth, "-").concat(dEndDay);
	var sDate1 = (0, convertDate)(startDate);
	var sDate2 = (0, convertDate)(endDate);
	return Math.floor((Date.parse(sDate2) - Date.parse(sDate1)) / 86400000);
};
var dateAdd = function (interval, value, year, month, day) {
	switch (interval) {
		case 'y': // add year
			year += value;
			break;
		case 'm': // add month
			month += value;
			break;
		case 'd': // add days
			day += value;
			break;
		case 'w': // add week
			day += value * 7;
			break;
	}
	var resDate = new Date(year, month - 1, day);
	return (0, formatReadDate)(resDate.getFullYear(), resDate.getMonth() + 1, resDate.getDate());
};
var roundTime = function (time) {
	var arrTime = time.split(':');
	var hour = (0, intVal)(arrTime[0]);
	var minute = (0, intVal)(arrTime[1]);
	var second = (0, intVal)(arrTime[2]);
	if (second >= 30) {
		minute += 1;
		second = 0;
	}
	else {
		second = 0;
	}
	if (minute >= 60) {
		minute = 0;
		hour += 1;
	}
	return [('0' + hour).slice(-2), ('0' + minute).slice(-2), ('0' + second).slice(-2)].join(':');
};
var roundUpTime = function (time) {
	var arrTime = time.split(':');
	var hour = (0, intVal)(arrTime[0]);
	var minute = (0, intVal)(arrTime[1]);
	var second = (0, intVal)(arrTime[2]);
	if (second >= 30)
		minute += 1;
	if (minute >= 60) {
		minute = 0;
		hour += 1;
	}
	return [('0' + hour).slice(-2), ('0' + minute).slice(-2)].join(':');
};
var mktime = function (hour, minute, second, month, day, year) {
	if (hour === void 0) { hour = 0; }
	if (minute === void 0) { minute = 0; }
	if (second === void 0) { second = 0; }
	if (month === void 0) { month = 0; }
	if (day === void 0) { day = 0; }
	if (year === void 0) { year = 0; }
	return new Date(year, month - 1, day, hour, minute, second, 0);
};
var National = /** @class */ (function () {
	function National() {
	}
	National.prototype.TahunBaru = function (year) {
		return (0, formatReadDate)(year, 1, 1);
	};
	National.prototype.Kemerdekaan = function (year) {
		return (0, formatReadDate)(year, 8, 17);
	};
	National.prototype.Buruh = function (year) {
		return (0, formatReadDate)(year, 5, 1);
	};
	National.prototype.Pancasila = function (year) {
		return (0, formatReadDate)(year, 6, 1);
	};
	return National;
}());
var Islam = /** @class */ (function () {
	var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
		if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
			if (ar || !(i in from)) {
				if (!ar) ar = Array.prototype.slice.call(from, 0, i);
				ar[i] = from[i];
			}
		}
		return to.concat(ar || Array.prototype.slice.call(from));
	};
	function Islam() {}
	Islam._masehiToHijriSincTemp = function (dYear, dMonth, dDay) {
		var intAW = 227016;
		var TA = [29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29];
		var JH = [0, 30, 59, 89, 118, 148, 177, 207, 236, 266, 295, 325, 354];
		var intMonth = dMonth < 3 ? dMonth + 12 : dMonth;
		var intYear = dMonth < 3 ? dYear - 1 : dYear;
		var intAM1 = (0, intVal)(365.25 * intYear) + (0, intVal)(30.60001 * (intMonth + 1)) + dDay - 428;
		var intB = intAM1 < 577748 ? 0 : 2 - (0, intVal)(intYear / 100) + (0, intVal)((0, intVal)(intYear / 100) / 4);
		var intAM = (0, intVal)(365.25 * intYear) + (0, intVal)(30.60001 * (intMonth + 1)) + dDay + intB - 428;
		var intAH = intAM - intAW;
		var intThH1 = (0, intVal)(intAH / 354.3671);
		var intModDay1 = (0, round)(intAH - 354.3671 * (0, intVal)(intAH / 354.3671), 0.5);
		var intModDay2 = (0, roundUp)(intAH - 354.3671 * (0, intVal)(intAH / 354.3671));
		var intDayCount = intAH < 0 ? intModDay1 : intModDay2;
		var intAddYear = (0, intVal)(intDayCount / 365);
		var intTHM2 = intThH1 + intAddYear + 1;
		var intSisa = (0, mod)(intDayCount, 365);
		var intBulan1 = 0;
		for (var x = 1; x <= 12; x++) {
			if (intSisa >= JH[x - 1] && intSisa <= JH[x]) {
				intBulan1 = x - 1;
				break;
			}
		}
		var intJmlHari = JH[intBulan1];
		var intSisaHari = intSisa - intJmlHari;
		var dHijri = intSisaHari === 0 ? TA[intBulan1] : intSisaHari;
		var mHijri = intSisaHari === 0 ? intBulan1 : (intBulan1 + 1) % 12 === 0 ? 12 : (intBulan1 + 1) % 12;
		var yHijri = intTHM2;
		if (intSisaHari === 355) {
			dHijri = 1;
			yHijri = intTHM2 + 1;
		}
		return (0, formatReadDate)((0, intVal)(yHijri), (0, intVal)(mHijri), dHijri);
	};
	Islam._masehiToHijriSinc = function (dYear, dMonth, dDay) {
		var newYear = dYear;
		var addYear = 0;
		var addMultiply = 0;
		if (dYear >= 2038) {
			addMultiply = (0, intVal)((dYear - 1982) / 56);
			addYear = addMultiply * 56;
			newYear = dYear - addMultiply * 56;
		}
		var dDateAfter = (0, dateAdd)('d', 1, newYear, dMonth, dDay);
		var arrDateAfter = dDateAfter.split('-');
		var intYearDate = (0, intVal)(arrDateAfter[0]) + addYear;
		var intMonthDate = (0, intVal)(arrDateAfter[1]);
		var intDayDate = (0, intVal)(arrDateAfter[2]);
		var M2JNow = Islam._masehiToHijriSincTemp(dYear, dMonth, dDay);
		var arrM2JNow = M2JNow.split('-');
		var M2JAfter = Islam._masehiToHijriSincTemp(intYearDate, intMonthDate, intDayDate);
		var arrM2JAfter = M2JAfter.split('-');
		var lastResultDay = (0, intVal)(arrM2JNow[2]);
		if ((0, intVal)(arrM2JNow[1]) === 1) {
			if ((0, intVal)(arrM2JNow[2]) === (0, intVal)(arrM2JAfter[2])) {
				lastResultDay = 30;
			}
		}
		return (0, formatReadDate)((0, intVal)(arrM2JNow[0]), (0, intVal)(arrM2JNow[1]), lastResultDay);
	};
	Islam._getHisab = function (index, yMasehi, yHijri, mLastMonth, addMonth, latitude, longitude, timezone, altitude) {
		if (index === void 0) { index = 0; }
		if (yMasehi === void 0) { yMasehi = 0; }
		if (yHijri === void 0) { yHijri = 0; }
		if (mLastMonth === void 0) { mLastMonth = 0; }
		if (addMonth === void 0) { addMonth = 0; }
		if (latitude === void 0) { latitude = -6.9128; }
		if (longitude === void 0) { longitude = 107.6206; }
		if (timezone === void 0) { timezone = 7; }
		if (altitude === void 0) { altitude = 10; }
		var result = {
			index: 0,
			last_hijri_year: 0,
			last_hijri_month: 0,
			add_month: 0,
			hijri_year: 0,
			hijri_month: 0,
			hijri_day: 0,
			hijri_date: '',
			masehi_year: 0,
			masehi_month: 0,
			masehi_day: 0,
			masehi_date: '',
			days_count: 0,
		};
		var timezoneconv = timezone * 15;
		var pilihanimkan = 2;
		var imkanurrukyah1 = 2;
		var Ir = pilihanimkan === 1 ? 0.1 : imkanurrukyah1;
		var akhirbulan = mLastMonth;
		var mHijri = 0;
		switch (index) {
			case 0:
				var datHijri = Islam._masehiToHijriSinc(yMasehi, 1, 1);
				var arrHijri = datHijri.split('-');
				mHijri = (0, intVal)(arrHijri[1]);
				yHijri = (0, intVal)(arrHijri[0]);
				akhirbulan = mHijri === 1 ? 12 : mHijri - 1;
				yHijri = mHijri === 1 ? yHijri - 1 : yHijri;
				break;
			case 1:
				yHijri = akhirbulan === 12 ? yHijri + addMonth : yHijri;
				akhirbulan = (0, mod)(akhirbulan + addMonth, 12) === 0 ? 12 : (0, mod)(akhirbulan + addMonth, 12);
				break;
			default:
				yHijri = akhirbulan === 12 ? yHijri + 1 : yHijri;
				akhirbulan = (0, mod)(akhirbulan + 1, 12) === 0 ? 12 : (0, mod)(akhirbulan + 1, 12);
				break;
		}
		result.index = index;
		result.last_hijri_year = yHijri;
		result.last_hijri_month = akhirbulan;
		var arrIRP = [0, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 2, 2, 0.1, 2, 0.1];
		var ImkanPilihan = pilihanimkan === 3 ? arrIRP[akhirbulan] : Ir;
		var PI = 3.14159265358979323846;
		var Dr = 180 / PI;
		var HY = yHijri + (akhirbulan * 29.53) / 354.3671;
		var K = Math.ceil((HY - 1410) * 12);
		var T = (0, round)(K / 1200, 10);
		var tJD1 = (0, round)(29.53058868 * K, 6);
		var tJD2 = Math.pow(T, 2);
		var tJD3 = 0.0001178 * tJD2;
		var JD = (0, round)(2447740.652 + tJD1 + tJD3, 6);
		var tM1a = (0, round)(29.10535608 * K, 6);
		var tM1b = 207.9587074;
		var tM1c = Math.pow(T, 2);
		var tM1d = -0.0000333 * tM1c;
		var tM1e = tM1a + tM1b + tM1d;
		var M1 = (0, round)(tM1e / 360, 10);
		var tM = M1 - (0, intVal)(M1);
		var M = tM * 360;
		var tMq1a = (0, round)(385.81691806 * K, 6);
		var tMq1b = 111.1791307;
		var tMq1c = Math.pow(T, 2);
		var tMq1d = 0.0107306 * tMq1c;
		var tMq1e = tMq1a + tMq1b + tMq1d;
		var Mq1 = tMq1e / 360;
		var tMq = Mq1 - (0, intVal)(Mq1);
		var Mq = tMq * 360;
		var tF1a = (0, round)(390.67050646 * K, 6);
		var tF1b = 164.2162296;
		var tF1c = Math.pow(T, 2);
		var tF1d = -0.0016528 * tF1c;
		var tF1e = tF1a + tF1b + tF1d;
		var F1 = tF1e / 360;
		var tF = F1 - (0, intVal)(F1);
		var F = tF * 360;
		var T1 = (0.1734 - 0.000395 * T) * Math.sin(M / Dr);
		var T2 = 0.0021 * Math.sin((2 * M) / Dr);
		var T3 = -0.4068 * Math.sin(Mq / Dr);
		var T4 = 0.0161 * Math.sin((2 * Mq) / Dr);
		var T5 = -0.0004 * Math.sin((3 * Mq) / Dr);
		var T6 = 0.0104 * Math.sin((2 * F) / Dr);
		var T7 = -0.0051 * Math.sin(M / Dr + Mq / Dr);
		var T8 = -0.0074 * Math.sin(M / Dr - Mq / Dr);
		var T9 = 0.0004 * Math.sin((2 * F) / Dr + M / Dr);
		var T10 = -0.0004 * Math.sin((2 * F) / Dr - M / Dr);
		var T11 = -0.0006 * Math.sin((2 * F) / Dr + Mq / Dr);
		var T12 = 0.001 * Math.sin((2 * F) / Dr - Mq / Dr);
		var T13 = 0.0005 * Math.sin(M / Dr + (2 * Mq) / Dr);
		var MT = T1 + T2 + T3 + T4 + T5 + T6 + T7 + T8 + T9 + T10 + T11 + T12 + T13;
		var JDIjtimak = (0, round)(JD + 0.5 + MT, 6);
		var WIq = JDIjtimak - (0, intPart)(JDIjtimak);
		var WI = WIq * 24;
		var Z = (0, intVal)(JDIjtimak);
		var tAA = Z - 1867216.25;
		var AA = (0, intVal)(tAA / 36524.25);
		var A = Z < 2299161 ? Z : Z + 1 + AA - (0, intVal)(AA / 4);
		var B = A + 1524;
		var C = (0, intVal)((B - 122.1) / 365.25);
		var D = (0, intVal)(365.25 * C);
		var E = (0, intVal)((B - D) / 30.6001);
		var TglMUT = (0, intVal)(B - D - (0, intVal)(30.6001 * E));
		var BlnMUT = E > 13.5 ? E - 13 : E - 1;
		var ThnMUT = BlnMUT < 2.5 ? C - 4715 : C - 4716;
		var newYear = ThnMUT;
		var addYear = 0;
		var addMultiply = 0;
		if (ThnMUT >= 2038) {
			addMultiply = (0, intVal)((ThnMUT - 1982) / 56);
			addYear = addMultiply * 56;
			newYear = ThnMUT - addYear;
		}
		var datFull = new Date(newYear, BlnMUT - 1, TglMUT, WI + timezone, 0, 0, 0);
		var TglM = datFull.getDate(); // C59
		var BlnM = datFull.getMonth() + 1; // C60
		var ThnM = datFull.getFullYear() + addYear; // C61
		JD =
			(0, trunc)(1461 * ((ThnM + 4800 + (BlnM - 14) / 12) / 4)) -
			(0, trunc)((3 / 400) * (ThnM + 4900 + (BlnM - 14) / 12)) +
			TglM -
			31709.5;
		T = (JD - 2451545) / 36525;
		var L = 279.69668 + 36000.76892 * T + 0.0003025 * Math.pow(T, 2);
		var G = 358.47583 + 35999.04975 * T - 0.00015 * Math.pow(T, 2) - 0.0000033 * Math.pow(T, 3);
		var R = 0.01675104 - 0.0000418 * T - 0.000000126 * Math.pow(T, 2);
		C =
			L +
			(1.91946 - 0.004789 * T - 0.000014 * Math.pow(T, 2)) * Math.sin((G * PI) / 180) +
			(0.020094 - 0.0001 * T) * Math.sin((2 * G * PI) / 180) +
			0.000293 * Math.sin((3 * G * PI) / 180);
		var mailkulli = 23.452294 - 0.0130125 * T - 0.00000164 * Math.pow(T, 2) + 0.000000503 * Math.pow(T, 3);
		var declinasimthr = (Math.asin(Math.sin((mailkulli * PI) / 180) * Math.sin((C * PI) / 180)) * 180) / PI;
		var tX = Math.tan(((mailkulli / 2) * PI) / 180);
		var X = Math.pow(tX, 2);
		var Tafawwut = ((X * Math.sin((2 * L * PI) / 180) -
			2 * R * Math.sin((G * PI) / 180) +
			4 * R * X * Math.sin((G * PI) / 180) * Math.cos((2 * L * PI) / 180) -
			0.5 * Math.pow(X, 2) * Math.sin((4 * L * PI) / 180) -
			(5 / 4) * Math.pow(R, 2) * Math.sin((2 * G * PI) / 180)) *
			180) /
			PI /
			15;
		var WaktuZawal = 12 - Tafawwut + (timezoneconv - longitude) / 15;
		var N = -Math.tan((latitude * PI) / 180) * Math.tan((declinasimthr * PI) / 180);
		var U = Math.cos((latitude * PI) / 180) * Math.cos((declinasimthr * PI) / 180);
		var W = (Math.acos(N + Math.sin((-1 * PI) / 180) / U) * 180) / PI / 15;
		var GhurubMthr2 = WaktuZawal + W;
		var GhurubMthr1 = GhurubMthr2 - timezone;
		var Tanggal = TglM;
		var Bulan = BlnM < 3 ? BlnM + 12 : BlnM;
		var Tahun = BlnM < 3 ? ThnM - 1 : ThnM;
		var GrbMatahariTqrb = GhurubMthr1;
		var B2 = 2 - (0, intVal)(Tahun / 100) + (0, intVal)((0, intVal)(Tahun / 100) / 4);
		var JD2 = (0, intVal)(365.25 * (Tahun + 4716)) + (0, intVal)(30.6001 * (Bulan + 1)) + Tanggal + GrbMatahariTqrb / 24 + B2 - 1524.5;
		T2 = (JD2 - 2451545) / 36525;
		var S1 = (280.46645 + 36000.76983 * T2) / 360;
		var S = (S1 - (0, intVal)(S1)) * 360;
		M1 = (357.5291 + 35999.0503 * T2) / 360;
		M = (M1 - (0, intVal)(M1)) * 360;
		var N1 = (125.04 - 1934.136 * T2) / 360;
		N = (N1 - (0, intVal)(N1)) * 360;
		var Kr1 = (17.264 / 3600) * Math.sin(N / Dr) + (0.206 / 3600) * Math.sin((2 * N) / Dr);
		var Kr2 = (-1.264 / 3600) * Math.sin((2 * S) / Dr);
		var Kr3 = (9.23 / 3600) * Math.cos(N / Dr) - (0.09 / 3600) * Math.cos((2 * N) / Dr);
		var Kr4 = (0.548 / 3600) * Math.cos((2 * S) / Dr);
		var Qq = 23.43929111 + Kr3 + Kr4 - (46.815 / 3600) * T2;
		E =
			(6898.06 / 3600) * Math.sin(M / Dr) +
			(72.095 / 3600) * Math.sin((2 * M) / Dr) +
			(0.966 / 3600) * Math.sin((3 * M) / Dr);
		var Sq = (0, mod)(S + E + Kr1 + Kr2 - 20.47 / 3600, 360);
		var MailS = (Math.asin(Math.sin(Sq / Dr) * Math.sin(Qq / Dr)) * 180) / PI;
		var Pta = (Math.atan(Math.tan(Sq / Dr) * Math.cos(Qq / Dr)) * 180) / PI;
		var Ptb = Sq >= 0 && Sq <= 90 ? Pta : 0;
		var Ptc = Sq >= 90 && Sq <= 270 ? Pta + 180 : 0;
		var Ptd = Sq >= 270 && Sq <= 360 ? Pta + 360 : 0;
		var PT = Ptb + Ptc + Ptd;
		var xsd = 0.267 / (1 - 0.017 * Math.cos(M / Dr));
		var Dip = (1.76 / 60) * Math.sqrt(altitude);
		var xh = -(xsd + 34.5 / 60 + Dip);
		var xt = (Math.acos(-Math.tan(latitude / Dr) * Math.tan(MailS / Dr) +
			Math.sin(xh / Dr) / Math.cos(latitude / Dr) / Math.cos(MailS / Dr)) *
			180) /
			PI;
		M1 = (218.31617 + 481267.88088 * T2) / 360;
		var HM = (M1 - (0, intVal)(M1)) * 360;
		var A1 = (134.96292 + 477198.86753 * T2) / 360;
		A = (0, mod)((A1 - (0, intVal)(A1)) * 360, 360);
		F1 = (93.27283 + 483202.01873 * T2) / 360;
		F = (F1 - (0, intVal)(F1)) * 360;
		var D1 = (297.85027 + 445267.11135 * T2) / 360;
		D = (D1 - (0, intVal)(D1)) * 360;
		T1 = (22640 / 3600) * Math.sin(A / Dr);
		T2 = (-4586 / 3600) * Math.sin((A - 2 * D) / Dr);
		T3 = (2370 / 3600) * Math.sin((2 * D) / Dr);
		T4 = (769 / 3600) * Math.sin((2 * A) / Dr);
		T5 = (-668 / 3600) * Math.sin(M / Dr);
		T6 = (-412 / 3600) * Math.sin((2 * F) / Dr);
		T7 = (-212 / 3600) * Math.sin((2 * A - 2 * D) / Dr);
		T8 = (-206 / 3600) * Math.sin((A + M - 2 * D) / Dr);
		T9 = (192 / 3600) * Math.sin((A + 2 * D) / Dr);
		T10 = (-165 / 3600) * Math.sin((M - 2 * D) / Dr);
		T11 = (148 / 3600) * Math.sin((A - M) / Dr);
		T12 = (-125 / 3600) * Math.sin(D / Dr);
		T13 = (-110 / 3600) * Math.sin((A + M) / Dr);
		var T14 = (-55 / 3600) * Math.sin((2 * F - 2 * D) / Dr);
		C = T1 + T2 + T3 + T4 + T5 + T6 + T7 + T8 + T9 + T10 + T11 + T12 + T13 + T14;
		var Mo = HM + C + Kr1 + Kr2 - 20.47 / 3600;
		var Aq = A + T2 + T3 + T5;
		var Lq = (18461 / 3600) * Math.sin(F / Dr) +
			(1010 / 3600) * Math.sin((A + F) / Dr) +
			(1000 / 3600) * Math.sin((A - F) / Dr) -
			(624 / 3600) * Math.sin((F - 2 * D) / Dr) -
			(199 / 3600) * Math.sin((A - F - 2 * D) / Dr) -
			(167 / 3600) * Math.sin((A + F - 2 * D) / Dr);
		var x = (Math.atan(Math.sin(Mo / Dr) * Math.tan(Qq / Dr)) * 180) / PI;
		var y = Lq + x;
		var nc = (Math.asin((Math.sin(Mo / Dr) * Math.sin(Qq / Dr) * Math.sin(y / Dr)) / Math.sin(x / Dr)) * 180) / PI;
		var Ptca = (Math.acos((Math.cos(Mo / Dr) * Math.cos(Lq / Dr)) / Math.cos(nc / Dr)) * 180) / PI;
		var Ptcb = Mo >= 0 && Mo <= 180 ? Ptca : 0;
		var Ptcc = Mo >= 180 && Mo <= 360 ? 360 - Ptca : 0;
		var PTc = Ptcb + Ptcc;
		var tc = (0, mod)(PT - PTc + xt, 360);
		var hc = (Math.asin(Math.sin(latitude / Dr) * Math.sin(nc / Dr) + Math.cos(latitude / Dr) * Math.cos(nc / Dr) * Math.cos(tc / Dr)) *
			180) /
			PI;
		var xp = (384401 * (1 - Math.pow(0.0549, 2))) / (1 + 0.0549 * Math.cos((Aq + T1) / Dr));
		var HP = 0.9507 / (xp / 384401);
		var sdc = 0.5181 / (xp / 384401) / 2;
		var P = HP * Math.cos(hc / Dr);
		var Ref = 0.0167 / Math.tan((hc + 7.31 / (hc + 4.4)) / Dr);
		var hcqa = hc < 0 || hc - P < 0 ? hc - P : 0;
		var hcqb = hc - P > 0 ? hc - P + sdc + Ref + Dip : 0;
		var hcq = hcqa + hcqb;
		var TambahHari = hcq >= ImkanPilihan ? 1 : 2;
		var BulanHijri = (0, mod)(akhirbulan + 1, 12);
		var TahunHijri = akhirbulan === 12 ? yHijri + 1 : yHijri;
		var arrJumlahBulan = [31, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		arrJumlahBulan[2] = (0, daysInMonth)(BlnM, ThnM);
		var tTanggalAwal = TglM + TambahHari > arrJumlahBulan[BlnM] ? TglM + TambahHari - arrJumlahBulan[BlnM] : TglM + TambahHari;
		var tBulanAwal = TglM + TambahHari > arrJumlahBulan[BlnM] ? (0, mod)(BlnM + 1, 12) : (0, mod)(BlnM, 12);
		var tTahunAwal = TglM + TambahHari > 31 && BlnM === 12 ? ThnM + 1 : ThnM;
		var TanggalAwal = tTanggalAwal;
		var BulanAwal = tBulanAwal === 0 ? 12 : tBulanAwal;
		var TahunAwal = tTahunAwal;
		addMonth = TglM < 3 && BlnM === 12 ? 1 : 0;
		if (BulanHijri === 0)
			BulanHijri = 12;
		result.add_month = addMonth;
		result.hijri_year = TahunHijri;
		result.hijri_month = BulanHijri;
		result.hijri_day = 1;
		result.hijri_date = (0, formatReadDate)(TahunHijri, BulanHijri, 1);
		result.masehi_year = TahunAwal;
		result.masehi_month = BulanAwal;
		result.masehi_day = TanggalAwal;
		result.masehi_date = (0, formatReadDate)(TahunAwal, BulanAwal, TanggalAwal);
		result.days_count = 0;
		return result;
	};
	Islam._calcHisab = function (year, latitude, longitude, timezone, altitude) {
		if (altitude === void 0) { altitude = 10; }
		var result = [];
		for (var i = 0; i <= 15; i++) {
			var itemResult = {
				index: 0,
				last_hijri_year: 0,
				last_hijri_month: 0,
				add_month: 0,
				hijri_year: 0,
				hijri_month: 0,
				hijri_day: 0,
				hijri_date: '',
				masehi_year: 0,
				masehi_month: 0,
				masehi_day: 0,
				masehi_date: '',
				days_count: 0,
			};
			result.push(itemResult);
		}
		result[0] = Islam._getHisab(0, year, 0, 0, 0, latitude, longitude, timezone, altitude);
		var yHijri = result[0].last_hijri_year;
		var mHijri = result[0].last_hijri_month;
		var addMonth = result[0].add_month;
		for (var i = 1; i <= 15; i++) {
			result[i].days_count = 0;
			yHijri = result[i - 1].last_hijri_year;
			mHijri = result[i - 1].last_hijri_month;
			addMonth = result[i - 1].add_month;
			result[i] = Islam._getHisab(i, year, yHijri, mHijri, addMonth, latitude, longitude, timezone, altitude);
			var startDate = result[i - 1].masehi_date;
			var endDate = result[i].masehi_date;
			result[i - 1].days_count = (0, daysBetween)(startDate, endDate);
		}
		return result;
	};
	Islam.prototype.HijriToMasehi = function (dYear, dMonth, dDay) {
		var intAW = 227016;
		var intAH = (0, trunc)((11 * dYear) / 30) + (0, trunc)(354 * dYear) + (0, trunc)(30 * dMonth) - (0, trunc)((dMonth - 1) / 2) + dDay - 384;
		var intAM = intAH + intAW;
		var intTHM1 = (0, intVal)(intAM / 1461) * 4;
		var intDayCount = intAM % 1461;
		var intAddYear = (0, intVal)(intDayCount / 365);
		var intTHM2 = intTHM1 + intAddYear + 1;
		var intA = intDayCount % 365;
		var intB = intAM < 577748 ? 0 : 2 - (0, intVal)(intTHM2 / 100) + (0, intVal)((0, intVal)(intTHM2 / 100) / 4);
		var intSisa = intA - intB;
		var JH = [31, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31, 31];
		JH[2] = intTHM2 % 4 === 0 || intTHM2 % 100 === 0 || intTHM2 % 400 === 0 ? 29 : 28;
		var JLH = [0, 31];
		var intMatch = 1;
		for (var x = 2; x <= 12; x++) {
			JLH[x] = JLH[x - 1] + JH[x];
		}
		for (var x = 1; x <= 12; x++) {
			if (intSisa >= JLH[x - 1] && intSisa <= JLH[x]) {
				intMatch = x - 1;
				break;
			}
		}
		var intBulan1 = intSisa < 31 ? 0 : intMatch;
		var intJmlHari = JLH[intBulan1];
		var intSisaHari = intSisa - intJmlHari;
		var dMasehi = intSisaHari === 0 ? JH[intBulan1] : intSisaHari;
		var mMasehi = intJmlHari === 0 ? intBulan1 : (intBulan1 + 1) % 12 === 0 ? 12 : (intBulan1 + 1) % 12;
		if (mMasehi === 0)
			mMasehi = 1;
		return (0, formatReadDate)((0, intVal)(intTHM2), (0, intVal)(mMasehi), dMasehi);
	};
	Islam.prototype.Hisab = function (year, latitude, longitude, timezone, altitude) {
		if (latitude === void 0) { latitude = -6.9128; }
		if (longitude === void 0) { longitude = 107.6206; }
		if (timezone === void 0) { timezone = 7; }
		if (altitude === void 0) { altitude = 10; }
		var yearBefore = year - 1;
		var hisabBefore = Islam._calcHisab(yearBefore, latitude, longitude, timezone, altitude);
		var daysCount = [];
		var startDateMasehi = [];
		var startDateHijri = [];
		var dateMasehiToHijriBefore = [];
		var dateMasehiToHijriNow = [];
		for (var i = 2; i < 16; i++) {
			daysCount.push(0);
			startDateMasehi.push('');
		}
		for (var i = 2; i < 16; i++) {
			startDateMasehi[i] = hisabBefore[i].masehi_date;
			startDateHijri[i] = hisabBefore[i].hijri_date;
			daysCount[i] = i < 15 ? hisabBefore[i].days_count : 0;
			var arrRealMasehi = startDateMasehi[i].split('-');
			var realYearMasehi = (0, intVal)(arrRealMasehi[0]);
			var arrDateMasehi = startDateMasehi[i].split('-');
			var arrDateHijri = startDateHijri[i].split('-');
			var thisDayMasehi = arrDateMasehi[2];
			var thisMonthMasehi = arrDateMasehi[1];
			var thisYearMasehi = arrDateMasehi[0];
			if ((0, intVal)(arrDateHijri[1]) === 0) {
				arrDateHijri[1] = '12';
			}
			var newYear = (0, intVal)(thisYearMasehi);
			var addYear = 0;
			var addMultiply = 0;
			if ((0, intVal)(thisYearMasehi) >= 2038) {
				addMultiply = ((0, intVal)(thisYearMasehi) - 1982) / 56;
				addYear = addMultiply * 56;
				newYear = (0, intVal)(thisYearMasehi) - addMultiply * 56;
			}
			for (var x = 0; x < daysCount[i]; x++) {
				var newDateMasehi = (0, dateAdd)('d', x, newYear, (0, intVal)(thisMonthMasehi), (0, intVal)(thisDayMasehi));
				var arrNewDateMasehi = newDateMasehi.split('-');
				realYearMasehi = realYearMasehi + (addYear + (0, intVal)(arrNewDateMasehi[0]) - realYearMasehi);
				if (i < 15) {
					dateMasehiToHijriBefore.push({
						masehi: (0, formatReadDate)((0, intVal)(realYearMasehi), (0, intVal)(arrNewDateMasehi[1]), (0, intVal)(arrNewDateMasehi[2])),
						hijri: (0, formatReadDate)((0, intVal)(arrDateHijri[0]), (0, intVal)(arrDateHijri[1]), (0, intVal)(arrDateHijri[2]) + x),
						daycount: daysCount[i],
					});
				}
			}
		}
		var hisabNow = Islam._calcHisab(year, latitude, longitude, timezone, altitude);
		for (var i = 2; i < 15; i++) {
			startDateMasehi[i] = hisabNow[i].masehi_date;
			startDateHijri[i] = hisabNow[i].hijri_date;
			daysCount[i] = hisabNow[i].days_count;
			var arrRealMasehi = startDateMasehi[i].split('-');
			var realYearMasehi = (0, intVal)(arrRealMasehi[0]);
			var arrDateMasehi = startDateMasehi[i].split('-');
			var arrDateHijri = startDateHijri[i].split('-');
			var thisDayMasehi = arrDateMasehi[2];
			var thisMonthMasehi = arrDateMasehi[1];
			var thisYearMasehi = arrDateMasehi[0];
			if ((0, intVal)(arrDateHijri[1]) === 0) {
				arrDateHijri[1] = '12';
			}
			for (var x = 0; x < daysCount[i]; x++) {
				var newYear = (0, intVal)(thisYearMasehi);
				var addYear = 0;
				var addMultiply = 0;
				if ((0, intVal)(thisYearMasehi) >= 2038) {
					addMultiply = ((0, intVal)(thisYearMasehi) - 1982) / 56;
					addYear = addMultiply * 56;
					newYear = (0, intVal)(thisYearMasehi) - addMultiply * 56;
				}
				var newDateMasehi = (0, dateAdd)('d', x, newYear, (0, intVal)(thisMonthMasehi), (0, intVal)(thisDayMasehi));
				var arrNewDateMasehi = newDateMasehi.split('-');
				realYearMasehi = realYearMasehi + (addYear + (0, intVal)(arrNewDateMasehi[0]) - realYearMasehi);
				dateMasehiToHijriNow.push({
					masehi: (0, formatReadDate)((0, intVal)(realYearMasehi), (0, intVal)(arrNewDateMasehi[1]), (0, intVal)(arrNewDateMasehi[2])),
					hijri: (0, formatReadDate)((0, intVal)(arrDateHijri[0]), (0, intVal)(arrDateHijri[1]), (0, intVal)(arrDateHijri[2]) + x),
					daycount: daysCount[i],
				});
			}
		}
		/*
		return {
			before: dateMasehiToHijriBefore,
			current: dateMasehiToHijriNow,
		};
		*/
		return __spreadArray(__spreadArray([], dateMasehiToHijriBefore, true), dateMasehiToHijriNow, true);
	};
	Islam.prototype.MasehiToHijri = function (dYear, dMonth, dDay, latitude, longitude, timezone, altitude) {
		if (latitude === void 0) { latitude = -6.9128; }
		if (longitude === void 0) { longitude = 107.6206; }
		if (timezone === void 0) { timezone = 7; }
		if (altitude === void 0) { altitude = 10; }
		var newDate = (0, formatReadDate)(dYear, dMonth, dDay);
		var dateMasehiToHijri;
		dateMasehiToHijri = this.Hisab(dYear, latitude, longitude, timezone, altitude);
		var arrDateBefore = dateMasehiToHijri.before;
		var arrDateCurrent = dateMasehiToHijri.current;
		var countArrBefore = arrDateBefore.length;
		var countArrCurrent = arrDateCurrent.length;
		var datReturn = '';
		var isFound = false;
		for (var i = 0; i < countArrCurrent; i++) {
			if (arrDateCurrent[i].masehi === newDate) {
				datReturn = arrDateCurrent[i].hijri;
				isFound = true;
				break;
			}
		}
		if (!isFound) {
			for (var i = 0; i < countArrBefore; i++) {
				if (arrDateBefore[i].masehi === newDate) {
					datReturn = arrDateBefore[i].hijri;
					isFound = true;
					break;
				}
			}
		}
		return datReturn;
	};
	Islam.prototype.Imsakiyah = function (dYear, dMonth, dDay, latitude, longitude, timezone, altitude, Shubuh, Thulu, Dhuha, Ihtiyat, Dhuhur, Ashar, Isya, Imsak) {
		if (latitude === void 0) { latitude = -6.9128; }
		if (longitude === void 0) { longitude = 107.6206; }
		if (timezone === void 0) { timezone = 7; }
		if (altitude === void 0) { altitude = 10; }
		if (Shubuh === void 0) { Shubuh = 20; }
		if (Thulu === void 0) { Thulu = 1; }
		if (Dhuha === void 0) { Dhuha = 4.5; }
		if (Ihtiyat === void 0) { Ihtiyat = 1; }
		if (Dhuhur === void 0) { Dhuhur = 4; }
		if (Ashar === void 0) { Ashar = 1; }
		if (Isya === void 0) { Isya = 18; }
		if (Imsak === void 0) { Imsak = 10; }
		var DIP = (1.76 / 60) * Math.sqrt(altitude);
		var JamDeklinasiGMT = 5;
		var PI = 3.14159265358979323846;
		var Dr = PI / 180;
		var BulanHt = dMonth < 3 ? dMonth + 12 : dMonth;
		var TahunHt = dMonth < 3 ? dYear - 1 : dYear;
		var KRG = 2 - (0, intVal)(TahunHt / 100) + (0, intVal)((0, intVal)(TahunHt / 100) / 4);
		var JD = (0, intVal)(365.25 * (TahunHt + 4716)) + (0, intVal)(30.6001 * (BulanHt + 1)) + dDay + JamDeklinasiGMT / 24 + KRG - 1524.5; // T11
		var T = (JD - 2451545) / 36525;
		var S1 = (280.46645 + 36000.76983 * T) / 360;
		var S = (S1 - (0, intVal)(S1)) * 360;
		var M1 = (357.5291 + 35999.0503 * T) / 360;
		var M = (M1 - (0, intVal)(M1)) * 360;
		var N1 = (125.04 - 1934.136 * T) / 360;
		var N1t = N1 < 0 ? -1 * (0, roundUp)(N1) : (0, roundUp)(N1);
		var N = (N1 - N1t) * 360;
		var Kr1 = (17.264 / 3600) * Math.sin(N * Dr) + (0.206 / 3600) * Math.sin(2 * N * Dr);
		var Kr2 = (-1.264 / 3600) * Math.sin(2 * S * Dr);
		var Kr3 = (9.23 / 3600) * Math.cos(N * Dr) - (0.09 / 3600) * Math.cos(2 * N * Dr);
		var Kr4 = (0.548 / 3600) * Math.cos(2 * S * Dr);
		var Qp = 23.43929111 + Kr3 + Kr4 - (46.815 / 3600) * T;
		var E = (6898.06 / 3600) * Math.sin(M * Dr) +
			(72.095 / 3600) * Math.sin(2 * M * Dr) +
			(0.966 / 3600) * Math.sin(3 * M * Dr);
		var Sp = (0, mod)(S + E + Kr1 + Kr2 - 20.47 / 3600, 360);
		var MailS = (Math.asin(Math.sin(Sp * Dr) * Math.sin(Qp * Dr)) * 180) / PI;
		var rQA = 0.5 * Qp;
		var rA = Math.pow(Math.tan(rQA * Dr), 2);
		var rE1 = 0.01675104 - 0.0000418 * T;
		var rE2 = 0.000000126 * T * T;
		var rE = rE1 + rE2;
		var rQ1 = rA * Math.sin(2 * S * Dr);
		var rQ2 = 2 * rE * Math.sin(M * Dr);
		var rQ3 = 4 * rE * rA * Math.sin(M * Dr) * Math.cos(2 * S * Dr);
		var rQ4 = 0.5 * rA * rA * Math.sin(4 * S * Dr);
		var rQ5 = 1.25 * rE * rE * Math.sin(2 * M * Dr);
		var rQ = rQ1 - rQ2 + rQ3 - rQ4 - rQ5;
		var rW = (rQ * 57.29577951) / 15;
		var Psd = 0.267 / (1 - 0.017 * Math.cos(M * Dr));
		var rF = -Math.tan(latitude * Dr) * Math.tan(MailS * Dr);
		var rG = Math.cos(latitude * Dr) * Math.cos(MailS * Dr);
		var lDhuhur = 12 - rW + (timezone * 15 - longitude) / 15;
		var lHa = (Math.atan(1 / (Math.tan(Math.abs(latitude - MailS) * Dr) + Ashar)) * 180) / PI;
		var lAshar = lDhuhur + (Math.acos(rF + Math.sin((lHa * PI) / 180) / rG) * 180) / PI / 15;
		var lHm = -(Psd + 34.5 / 60 + DIP) - 0.0024; // BJ11
		var lMaghrib = lDhuhur + (Math.acos(rF + Math.sin(lHm * Dr) / rG) * 180) / PI / 15;
		var lIsya = lDhuhur + (Math.acos(rF + Math.sin(-Isya * Dr) / rG) * 180) / PI / 15;
		var lShubuh = lDhuhur - (Math.acos(rF + Math.sin(-Shubuh * Dr) / rG) * 180) / PI / 15;
		var lImsak = lShubuh - Imsak / 60;
		var lSyuruq = lDhuhur - (Math.acos(rF + Math.sin(lHm * Dr) / rG) * 180) / PI / 15;
		var lDhuha = lDhuhur - (Math.acos(rF + Math.sin(Dhuha * Dr) / rG) * 180) / PI / 15;
		var rIMSAK = (0, ceiling)(lImsak / 24, 0.5 / 24 / 60) + Ihtiyat / 24 / 60;
		var rSHUBUH = (0, ceiling)(lShubuh / 24, 0.5 / 24 / 60) + Ihtiyat / 24 / 60;
		var rSYURUQ = lSyuruq / 24 - Ihtiyat / 24 / 60;
		var rDHUHA = (0, ceiling)(lDhuha / 24, 0.5 / 24 / 60) + Ihtiyat / 24 / 60;
		var rDHUHUR = (0, ceiling)(lDhuhur / 24, 0.5 / 24 / 60) + Dhuhur / 24 / 60;
		var rASHAR = (0, ceiling)(lAshar / 24, 0.5 / 24 / 60) + Ihtiyat / 24 / 60;
		var rMAGHRIB = (0, ceiling)(lMaghrib / 24, 0.5 / 24 / 60) + Ihtiyat / 24 / 60;
		var rISYA = (0, ceiling)(lIsya / 24, 0.5 / 24 / 60) + Ihtiyat / 24 / 60;
		var dateCalc = (0, formatReadDate)(dYear, dMonth, dDay);
		var curDateTime = new Date(dYear, dMonth - 1, dDay, 0, 0, 1, 0).getTime() / 1000;
		var dIMSAK = new Date((curDateTime + (0, round)(Math.floor(rIMSAK * 3600 * 24), 1)) * 1000);
		var dSHUBUH = new Date((curDateTime + (0, round)(Math.floor(rSHUBUH * 3600 * 24), 1)) * 1000);
		var dSYURUQ = new Date((curDateTime + (0, round)(Math.floor(rSYURUQ * 3600 * 24), 1)) * 1000);
		var dDHUHA = new Date((curDateTime + (0, round)(Math.floor(rDHUHA * 3600 * 24), 1)) * 1000);
		var dDHUHUR = new Date((curDateTime + (0, round)(Math.floor(rDHUHUR * 3600 * 24), 1)) * 1000);
		var dASHAR = new Date((curDateTime + (0, round)(Math.floor(rASHAR * 3600 * 24), 1)) * 1000);
		var dMAGHRIB = new Date((curDateTime + (0, round)(Math.floor(rMAGHRIB * 3600 * 24), 1)) * 1000);
		var dISYA = new Date((curDateTime + (0, round)(Math.floor(rISYA * 3600 * 24), 1)) * 1000);
		var tIMSAK = (0, formatReadTime)(dIMSAK);
		var tSHUBUH = (0, formatReadTime)(dSHUBUH);
		var tSYURUQ = (0, formatReadTime)(dSYURUQ);
		var tDHUHA = (0, formatReadTime)(dDHUHA);
		var tDHUHUR = (0, formatReadTime)(dDHUHUR);
		var tASHAR = (0, formatReadTime)(dASHAR);
		var tMAGHRIB = (0, formatReadTime)(dMAGHRIB);
		var tISYA = (0, formatReadTime)(dISYA);
		var result = {
			date: dateCalc,
			imsak: (0, roundTime)(tIMSAK),
			shubuh: (0, roundTime)(tSHUBUH),
			syuruq: (0, roundTime)(tSYURUQ),
			dhuha: (0, roundTime)(tDHUHA),
			dhuhur: (0, roundTime)(tDHUHUR),
			ashar: (0, roundTime)(tASHAR),
			maghrib: (0, roundTime)(tMAGHRIB),
			isya: (0, roundTime)(tISYA),
		};
		return result;
	};
	return Islam;
}());
var Christian = /** @class */ (function () {
	function Christian() {
	}
	Christian._calcGlobal = function (year) {
		var intA = (0, mod)(year, 19);
		var intB = (0, mod)(year, 4);
		var intC = (0, mod)(year, 7);
		var intH = year >= 1900 && year <= 2099 ? 5 : 0;
		var intI = year >= 2100 && year <= 2199 ? 6 : 0;
		var intJ = year >= 2200 && year <= 2299 ? 0 : 0;
		var intK = intH + intI + intJ;
		var intL = year >= 1900 && year <= 2099 ? 24 : 0;
		var intM = year >= 2100 && year <= 2199 ? 24 : 0;
		var intN = year >= 2200 && year <= 2299 ? 25 : 0;
		var intO = intL + intM + intN;
		var intD = (0, mod)(19 * intA + intO, 30);
		var intE = (0, mod)(2 * intB + 4 * intC + 6 * intD + intK, 7);
		var intF = intD + intE < 10 ? 3 : 4;
		var intG = intD + intE < 10 ? intD + intE + 22 : intD + intE - 9;
		return {
			month: intF,
			day: intG,
		};
	};
	Christian.prototype.Paskah = function (year) {
		var calc = Christian._calcGlobal(year);
		return (0, formatReadDate)(year, calc.month, calc.day);
	};
	Christian.prototype.Kenaikan = function (year) {
		var calc = Christian._calcGlobal(year);
		return (0, dateAdd)('d', 39, year, calc.month, calc.day);
	};
	Christian.prototype.Wafat = function (year) {
		var calc = Christian._calcGlobal(year);
		return (0, dateAdd)('d', -2, year, calc.month, calc.day);
	};
	Christian.prototype.Maundy = function (year) {
		var calc = Christian._calcGlobal(year);
		return (0, dateAdd)('d', -3, year, calc.month, calc.day);
	};
	Christian.prototype.Holly = function (year) {
		var calc = Christian._calcGlobal(year);
		return (0, dateAdd)('d', -1, year, calc.month, calc.day);
	};
	Christian.prototype.Natal = function (year) {
		return (0, formatReadDate)(year, 12, 25);
	};
	Christian.prototype.NatalBefore = function (year) {
		return (0, formatReadDate)(year, 12, 24);
	};
	Christian.prototype.NatalAfter = function (year) {
		return (0, formatReadDate)(year, 12, 26);
	};
	return Christian;
}());
var Hindu = /** @class */ (function () {
	function Hindu() {
	}
	Hindu.prototype.Nyepi = function (year) {
		var cTanggal = 28;
		var cBulan = 3;
		var TA = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		TA[1] = 0;
		TA[2] = 30;
		TA[3] = 60;
		TA[4] = 89;
		TA[5] = 119;
		TA[6] = 148;
		TA[7] = 178;
		TA[8] = 207;
		TA[9] = 237;
		TA[10] = 266;
		TA[11] = 296;
		TA[12] = 325;
		TA[13] = 355;
		TA[14] = 384;
		TA[15] = 414;
		TA[16] = 443;
		TA[17] = 473;
		TA[18] = 502;
		TA[19] = 532;
		TA[20] = 562;
		TA[21] = 591;
		TA[22] = 621;
		TA[23] = 650;
		TA[24] = 680;
		TA[25] = 709;
		TA[26] = 739;
		TA[27] = 768;
		TA[28] = 798;
		TA[29] = 827;
		TA[30] = 857;
		TA[31] = 886;
		TA[32] = 916;
		TA[33] = 945;
		var intBulan;
		var intTahun;
		if (cBulan < 3) {
			intBulan = cBulan + 12;
		}
		else {
			intBulan = cBulan;
		}
		if (intBulan < 3) {
			intTahun = year - 1;
		}
		else {
			intTahun = year;
		}
		var newYear = intTahun;
		var addYear = 0;
		var addMultiply = 0;
		if (intTahun >= 2038) {
			addMultiply = (0, intVal)((intTahun - 1982) / 56);
			addYear = addMultiply * 56;
			newYear = intTahun - addYear;
		}
		var intAM1 = (0, intVal)(365.25 * intTahun) + (0, intVal)(30.60001 * (intBulan + 1)) + cTanggal - 428;
		var intKoreksiGr;
		if (intAM1 < 577748) {
			intKoreksiGr = 0;
		}
		else {
			intKoreksiGr = 2 - (0, intVal)(intTahun / 100) + (0, intVal)((0, intVal)(intTahun / 100) / 4);
		}
		var intH = (0, intVal)(365.25 * intTahun) + (0, intVal)(30.60001 * (intBulan + 1)) + cTanggal + intKoreksiGr - 428;
		var intN = (0, mod)(intH, 945);
		var intI;
		if (intN < 351) {
			intI = (intN + 945) - 351;
		}
		else {
			intI = intN - 351;
		}
		var Ya = 0;
		var Yb = 0;
		for (var x = 1; x <= 33; x++) {
			if (TA[x] >= intI) {
				Ya = TA[x];
				Yb = TA[x - 1];
				break;
			}
		}
		var datA1 = new Date(newYear, 2, 31);
		var datA2 = new Date(newYear, 2, 2);
		var Ma = Ya - intI + 1;
		var Mb = intI - Yb - 1;
		var MbMin = Mb + 1;
		var datMa = (0, dateAdd)('d', Ma - 1, newYear, intBulan, cTanggal);
		var datMb = (0, dateAdd)('d', -MbMin, newYear, intBulan, cTanggal);
		var pdatMa1 = datMa.split('-');
		var datMa1 = new Date((0, intVal)(pdatMa1[0]), (0, intVal)(pdatMa1[1]) - 1, (0, intVal)(pdatMa1[2]));
		var pdatMb1 = datMb.split('-');
		var datMb1 = new Date((0, intVal)(pdatMb1[0]), (0, intVal)(pdatMb1[1]) - 1, (0, intVal)(pdatMb1[2]));
		var lngMa = (datMa1.getTime() >= datA1.getTime()) ? 0 : datMa1.getTime();
		var lngMb = (datMb1.getTime() >= datA2.getTime()) ? datMb1.getTime() : 0;
		var intResult = lngMa + lngMb;
		var datResult = new Date(intResult);
		var datNyepi = (0, formatReadDate)(datResult.getFullYear(), datResult.getMonth() + 1, datResult.getDate());
		var arrNyepi = datNyepi.split('-');
		if ((0, intVal)(arrNyepi[1]) === 1) {
			intResult = datMa1.getTime();
		}
		if ((0, intVal)(arrNyepi[1]) === 3) {
			switch ((0, intVal)(arrNyepi[2])) {
				case 2:
					intResult = datMa1.getTime();
					break;
				case 6:
					intResult = datMa1.getTime();
					break;
			}
		}
		datResult = new Date(intResult);
		datNyepi = (0, formatReadDate)(datResult.getFullYear(), datResult.getMonth() + 1, datResult.getDate());
		var arrDate = datNyepi.split('-');
		// saka = iTahun - 78
		return (0, formatReadDate)(year, (0, intVal)(arrDate[1]), (0, intVal)(arrDate[2]));
	};
	Hindu.prototype.Tahun = function (year) {
		return year - 78;
	};
	return Hindu;
}());
var Buddha = /** @class */ (function () {
	function Buddha() {
	}
	Buddha.prototype.Waisak = function (year) {
		var PI = 3.141592654;
		var newYear = year;
		if (year >= 2038) {
			var addMultiply = (0, intVal)((year - 1982) / 56);
			var addYear = addMultiply * 56;
			newYear = year - addYear;
		}
		var intIJST1 = 0;
		var intTanggal1 = 5;
		var intBulan1 = 5;
		var intArrTahun1 = year;
		var datFull1 = new Date(newYear, intBulan1 - 1, intTanggal1);
		var intTa11 = intArrTahun1 % 4 === 0 ? 1 : 0;
		var intTa21 = intArrTahun1 % 100 === 0 ? 1 : 0;
		var intTa31 = intTa11 + intTa21;
		var dblKB1 = intTa31 > 0 ? 1 : 2;
		var dblK11 = (0, trunc)((275 * intBulan1) / 9);
		var dblK21 = (0, trunc)((intBulan1 + 9) / 12) * dblKB1;
		var dblK31 = dblK11 - dblK21 + intTanggal1 - 30;
		var dblK41 = dblK31 / 365.25 + (intArrTahun1 - 1900);
		var dblK51 = dblK41 * 12.3685;
		var dblK61 = dblK51 - (0, trunc)(dblK51);
		var dblK71 = dblK61 > 0.5 ? (0, trunc)(dblK51 + 1) : (0, trunc)(dblK51);
		var dblKN1 = intIJST1 === 1 ? dblK71 : dblK71 - 0.5;
		var dblT1 = dblKN1 / 1236.85;
		var dblM11 = 29.10535608 * dblKN1;
		var dblM21 = -0.000033 * dblT1 * dblT1;
		var dblM31 = -0.00000347 * dblT1 * dblT1 * dblT1;
		var dblM1 = (0, mod)(359.2242 + dblM11 + dblM21 + dblM31, 360);
		var dblMA11 = 385.81691806 * dblKN1;
		var dblMA21 = 0.0107306 * dblT1 * dblT1;
		var dblMA31 = 0.00001236 * dblT1 * dblT1 * dblT1;
		var dblMA1 = (0, mod)(306.0253 + dblMA11 + dblMA21 + dblMA31, 360);
		var dblF11 = 390.67050646 * dblKN1;
		var dblF21 = -0.0016528 * dblT1 * dblT1;
		var dblF31 = -0.00000239 * dblT1 * dblT1 * dblT1;
		var dblF1 = (0, mod)(21.2964 + dblF11 + dblF21 + dblF31, 360);
		var dblKRA11 = 0.1734 - 0.000393 * dblT1;
		var dblKRA21 = dblKRA11 * Math.sin((dblM1 * PI) / 180);
		var dblKRA31 = -0.4068 * Math.sin((dblMA1 * PI) / 180);
		var dblKRA41 = 0.0021 * Math.sin((2 * dblM1 * PI) / 180);
		var dblKRA51 = 0.0161 * Math.sin((2 * dblMA1 * PI) / 180);
		var dblKRA61 = -0.0004 * Math.sin((3 * dblMA1 * PI) / 180);
		var dblKORA1 = dblKRA21 + dblKRA31 + dblKRA41 + dblKRA51 + dblKRA61;
		var dblKRB11 = -0.0051 * Math.sin(((dblM1 + dblMA1) * PI) / 180);
		var dblKRB21 = -0.0074 * Math.sin(((dblM1 - dblMA1) * PI) / 180);
		var dblKRB31 = 0.0004 * Math.sin(((2 * dblF1 + dblM1) * PI) / 180);
		var dblKRB41 = -0.0004 * Math.sin(((2 * dblF1 - dblM1) * PI) / 180);
		var dblKRB51 = 0.0104 * Math.sin((2 * dblF1 * PI) / 180);
		var dblKORB1 = dblKRB11 + dblKRB21 + dblKRB31 + dblKRB41 + dblKRB51;
		var dblKC11 = -0.0006 * Math.sin(((2 * dblF1 + dblMA1) * PI) / 180);
		var dblKC21 = 0.001 * Math.sin(((2 * dblF1 - dblMA1) * PI) / 180);
		var dblKC31 = 0.0005 * Math.sin(((dblM1 + 2 * dblMA1) * PI) / 180);
		var dblKORC1 = dblKC11 + dblKC21 + dblKC31;
		var dblKoreksi1 = dblKORA1 + dblKORB1 + dblKORC1;
		var dblJdA11 = 29.53058868 * dblKN1;
		var dblJdA21 = 0.0001178 * dblT1 * dblT1 * dblT1;
		var dblJdA31 = -0.000000155 * dblT1 * dblT1 * dblT1;
		var dblJdB11 = 132.87 * dblT1;
		var dblJdB21 = 0.009173 * dblT1 * dblT1;
		var dblJdB31 = 166.56 + dblJdB11 - dblJdB21;
		var dblJdC11 = 0.00033 * Math.sin((dblJdB31 * PI) / 180);
		var dblJdC21 = dblJdA11 + dblJdA21 + dblJdA31 + dblJdC11;
		var dblJdC31 = 2415020.75933 + dblJdC21;
		var dblJD1 = dblJdC31 + 0.5 + dblKoreksi1;
		var dblZJd1 = (0, trunc)(dblJD1);
		var dblEFJd1 = dblJD1 - dblZJd1;
		var dblAPJd1 = (0, trunc)((dblZJd1 - 1867216.25) / 36524.25);
		var dblAJd1 = dblZJd1 < 2299161 ? dblZJd1 : dblZJd1 + 1 + dblAPJd1 - (0, trunc)(dblAPJd1 / 4);
		var dblBJd1 = dblAJd1 + 1524;
		var dblCJd1 = (0, trunc)((dblBJd1 - 122.1) / 365.25);
		var dblDJd1 = (0, trunc)(365.25 * dblCJd1);
		var dblEJd1 = (0, trunc)((dblBJd1 - dblDJd1) / 30.6001);
		var dblTgl11 = dblBJd1 - dblDJd1 - (0, trunc)(30.6001 * dblEJd1) + dblEFJd1;
		var dblTgl21 = (0, trunc)(dblTgl11);
		var dblTgl31 = dblTgl11 - dblTgl21;
		var dblTgl41 = dblTgl31 * 24;
		var dblTgl51 = dblTgl41 + 7;
		var dblTglM1 = dblTgl51 <= 24 ? dblTgl21 : dblTgl21 + 1;
		var dblHasilBulan1 = dblEJd1 < 13.5 ? dblEJd1 - 1 : dblEJd1 - 13;
		var intTahun1 = dblHasilBulan1 < 2.5 ? (0, trunc)(dblCJd1 - 4715) : (0, trunc)(dblCJd1 - 4716);
		var newYear1 = intTahun1;
		var addYear1 = 0;
		if (intTahun1 >= 2038) {
			var addmultiply1 = (0, intVal)((intTahun1 - 1982) / 56);
			addYear1 = addmultiply1 * 56;
			newYear1 = intTahun1 - addYear1;
		}
		var datHasil1 = new Date(newYear1, dblHasilBulan1 - 1, dblTglM1);
		var temp1 = (0, dateAdd)('d', 0, newYear1, dblHasilBulan1, dblTglM1);
		var temp2 = (0, dateAdd)('d', 29, newYear1, dblHasilBulan1, dblTglM1);
		var datFull2 = datHasil1 > datFull1 ? temp1 : temp2;
		var moon2 = (0, mod)(year, 19);
		if (moon2 == 9)
			datFull2 = temp2;
		var EdatFull = datFull2.split('-');
		var intIJST2 = 0;
		var intTanggal2 = (0, intVal)(EdatFull[2]);
		var intBulan2 = (0, intVal)(EdatFull[1]);
		var intArrTahun2 = (0, intVal)(EdatFull[0]) + addYear1;
		var intTa12 = (0, intVal)(intArrTahun2) % 4 === 0 ? 1 : 0;
		var intTa22 = (0, intVal)(intArrTahun2) % 100 === 0 ? 1 : 0;
		var intTa32 = intTa12 + intTa22;
		var dblKB2 = intTa32 > 0 ? 1 : 2;
		var dblK12 = (0, trunc)((275 * intBulan2) / 9);
		var dblK22 = (0, trunc)((intBulan2 + 9) / 12) * dblKB2;
		var dblK32 = dblK12 - dblK22 + intTanggal2 - 30;
		var dblK42 = dblK32 / 365.25 + (intArrTahun2 - 1900);
		var dblK52 = dblK42 * 12.3685;
		var dblK62 = dblK52 - (0, trunc)(dblK52);
		var dblK72 = dblK62 > 0.5 ? (0, trunc)(dblK52 + 1) : (0, trunc)(dblK52);
		var dblKN2 = intIJST2 === 1 ? dblK72 : dblK72 - 0.5;
		var dblT2 = dblKN2 / 1236.85;
		var dblM12 = 29.10535608 * dblKN2;
		var dblM22 = -0.000033 * dblT2 * dblT2;
		var dblM32 = -0.00000347 * dblT2 * dblT2 * dblT2;
		var dblM2 = (0, mod)(359.2242 + dblM12 + dblM22 + dblM32, 360);
		var dblMA12 = 385.81691806 * dblKN2;
		var dblMA22 = 0.0107306 * dblT2 * dblT2;
		var dblMA32 = 0.00001236 * dblT2 * dblT2 * dblT2;
		var dblMA2 = (0, mod)(306.0253 + dblMA12 + dblMA22 + dblMA32, 360);
		var dblF12 = 390.67050646 * dblKN2;
		var dblF22 = -0.0016528 * dblT2 * dblT2;
		var dblF32 = -0.00000239 * dblT2 * dblT2 * dblT2;
		var dblF2 = (0, mod)(21.2964 + dblF12 + dblF22 + dblF32, 360);
		var dblKRA12 = 0.1734 - 0.000393 * dblT2;
		var dblKRA22 = dblKRA12 * Math.sin((dblM2 * PI) / 180);
		var dblKRA32 = -0.4068 * Math.sin((dblMA2 * PI) / 180);
		var dblKRA42 = 0.0021 * Math.sin((2 * dblM2 * PI) / 180);
		var dblKRA52 = 0.0161 * Math.sin((2 * dblMA2 * PI) / 180);
		var dblKRA62 = -0.0004 * Math.sin((3 * dblMA2 * PI) / 180);
		var dblKORA2 = dblKRA22 + dblKRA32 + dblKRA42 + dblKRA52 + dblKRA62;
		var dblKRB12 = -0.0051 * Math.sin(((dblM2 + dblMA2) * PI) / 180);
		var dblKRB22 = -0.0074 * Math.sin(((dblM2 - dblMA2) * PI) / 180);
		var dblKRB32 = 0.0004 * Math.sin(((2 * dblF2 + dblM2) * PI) / 180);
		var dblKRB42 = -0.0004 * Math.sin(((2 * dblF2 - dblM2) * PI) / 180);
		var dblKRB52 = 0.0104 * Math.sin((2 * dblF2 * PI) / 180);
		var dblKORB2 = dblKRB12 + dblKRB22 + dblKRB32 + dblKRB42 + dblKRB52;
		var dblKC12 = -0.0006 * Math.sin(((2 * dblF2 + dblMA2) * PI) / 180);
		var dblKC22 = 0.001 * Math.sin(((2 * dblF2 - dblMA2) * PI) / 180);
		var dblKC32 = 0.0005 * Math.sin(((dblM2 + 2 * dblMA2) * PI) / 180);
		var dblKORC2 = dblKC12 + dblKC22 + dblKC32;
		var dblKoreksi2 = dblKORA2 + dblKORB2 + dblKORC2;
		var dblJdA12 = 29.53058868 * dblKN2;
		var dblJdA22 = 0.0001178 * dblT2 * dblT2 * dblT2;
		var dblJdA32 = -0.000000155 * dblT2 * dblT2 * dblT2;
		var dblJdB12 = 132.87 * dblT2;
		var dblJdB22 = 0.009173 * dblT2 * dblT2;
		var dblJdB32 = 166.56 + dblJdB12 - dblJdB22;
		var dblJdC12 = 0.00033 * Math.sin((dblJdB32 * PI) / 180);
		var dblJdC22 = dblJdA12 + dblJdA22 + dblJdA32 + dblJdC12;
		var dblJdC32 = 2415020.75933 + dblJdC22;
		var dblJD2 = dblJdC32 + 0.5 + dblKoreksi2;
		var dblZJd2 = (0, trunc)(dblJD2);
		var dblEFJd2 = dblJD2 - dblZJd2;
		var dblAPJd2 = (0, trunc)((dblZJd2 - 1867216.25) / 36524.25);
		var dblAJd2 = dblZJd2 < 2299161 ? dblZJd2 : dblZJd2 + 1 + dblAPJd2 - (0, trunc)(dblAPJd2 / 4);
		var dblBJd2 = dblAJd2 + 1524;
		var dblCJd2 = (0, trunc)((dblBJd2 - 122.1) / 365.25);
		var dblDJd2 = (0, trunc)(365.25 * dblCJd2);
		var dblEJd2 = (0, trunc)((dblBJd2 - dblDJd2) / 30.6001);
		var dblTgl12 = dblBJd2 - dblDJd2 - (0, trunc)(30.6001 * dblEJd2) + dblEFJd2;
		var dblTgl22 = (0, trunc)(dblTgl12);
		var dblTgl32 = dblTgl12 - dblTgl22;
		var dblTgl42 = dblTgl32 * 24;
		var dblTgl52 = dblTgl42 + 7;
		var dblTglM2 = dblTgl52 <= 24 ? dblTgl22 : dblTgl22 + 1;
		var dblHasilBulan2 = dblEJd2 < 13.5 ? dblEJd2 - 1 : dblEJd2 - 13;
		return (0, formatReadDate)(year, dblHasilBulan2, dblTglM2);
	};
	Buddha.prototype.Tahun = function (year) {
		return year + 544;
	};
	return Buddha;
}());
var China = /** @class */ (function () {
	function China() {
	}
	China.prototype.Imlek = function (year) {
		var PI = 3.141592654;
		var intIJST1 = 1;
		var intTanggal1 = 22;
		var intBulan1 = 12;
		var intArrTahun1 = year - 1;
		var newYear = intArrTahun1;
		var addYear = 0;
		var addMultiply = 0;
		if (year >= 2038) {
			addMultiply = (0, intVal)((year - 1982) / 56);
			addYear = addMultiply * 56;
			newYear = year - addYear - 1;
		}
		var datFull1 = (0, mktime)(0, 0, 0, intBulan1, intTanggal1, newYear);
		var intTa11 = intArrTahun1 % 4 === 0 ? 1 : 0;
		var intTa21 = intArrTahun1 % 100 === 0 ? 1 : 0;
		var intTa31 = intTa11 + intTa21;
		var dblKB1 = intTa31 > 0 ? 1 : 2;
		var dblK11 = (0, trunc)((275 * intBulan1) / 9);
		var dblK21 = (0, trunc)((intBulan1 + 9) / 12) * dblKB1;
		var dblK31 = dblK11 - dblK21 + intTanggal1 - 30;
		var dblK41 = dblK31 / 365.25 + (intArrTahun1 - 1900);
		var dblK51 = dblK41 * 12.3685;
		var dblK61 = dblK51 - (0, trunc)(dblK51);
		var dblK71 = dblK61 > 0.5 ? (0, trunc)(dblK51 + 1) : (0, trunc)(dblK51);
		var dblKN1 = intIJST1 === 1 ? dblK71 : dblK71 - 0.5;
		var dblT1 = dblKN1 / 1236.85;
		var dblM11 = 29.10535608 * dblKN1;
		var dblM21 = -0.000033 * dblT1 * dblT1;
		var dblM31 = -0.00000347 * dblT1 * dblT1 * dblT1;
		var dblM1 = (0, mod)(359.2242 + dblM11 + dblM21 + dblM31, 360);
		var dblMA11 = 385.81691806 * dblKN1;
		var dblMA21 = 0.0107306 * dblT1 * dblT1;
		var dblMA31 = 0.00001236 * dblT1 * dblT1 * dblT1;
		var dblMA1 = (0, mod)(306.0253 + dblMA11 + dblMA21 + dblMA31, 360);
		var dblF11 = 390.67050646 * dblKN1;
		var dblF21 = -0.0016528 * dblT1 * dblT1;
		var dblF31 = -0.00000239 * dblT1 * dblT1 * dblT1;
		var dblF1 = (0, mod)(21.2964 + dblF11 + dblF21 + dblF31, 360);
		var dblKRA11 = 0.1734 - 0.000393 * dblT1;
		var dblKRA21 = dblKRA11 * Math.sin((dblM1 * PI) / 180);
		var dblKRA31 = -0.4068 * Math.sin((dblMA1 * PI) / 180);
		var dblKRA41 = 0.0021 * Math.sin((2 * dblM1 * PI) / 180);
		var dblKRA51 = 0.0161 * Math.sin((2 * dblMA1 * PI) / 180);
		var dblKRA61 = -0.0004 * Math.sin((3 * dblMA1 * PI) / 180);
		var dblKORA1 = dblKRA21 + dblKRA31 + dblKRA41 + dblKRA51 + dblKRA61;
		var dblKRB11 = -0.0051 * Math.sin(((dblM1 + dblMA1) * PI) / 180);
		var dblKRB21 = -0.0074 * Math.sin(((dblM1 - dblMA1) * PI) / 180);
		var dblKRB31 = 0.0004 * Math.sin(((2 * dblF1 + dblM1) * PI) / 180);
		var dblKRB41 = -0.0004 * Math.sin(((2 * dblF1 - dblM1) * PI) / 180);
		var dblKRB51 = 0.0104 * Math.sin((2 * dblF1 * PI) / 180);
		var dblKORB1 = dblKRB11 + dblKRB21 + dblKRB31 + dblKRB41 + dblKRB51;
		var dblKC11 = -0.0006 * Math.sin(((2 * dblF1 + dblMA1) * PI) / 180);
		var dblKC21 = 0.001 * Math.sin(((2 * dblF1 - dblMA1) * PI) / 180);
		var dblKC31 = 0.0005 * Math.sin(((dblM1 + 2 * dblMA1) * PI) / 180);
		var dblKORC1 = dblKC11 + dblKC21 + dblKC31;
		var dblKoreksi1 = dblKORA1 + dblKORB1 + dblKORC1;
		var dblJdA11 = 29.53058868 * dblKN1;
		var dblJdA21 = 0.0001178 * dblT1 * dblT1 * dblT1;
		var dblJdA31 = -0.000000155 * dblT1 * dblT1 * dblT1;
		var dblJdB11 = 132.87 * dblT1;
		var dblJdB21 = 0.009173 * dblT1 * dblT1;
		var dblJdB31 = 166.56 + dblJdB11 - dblJdB21;
		var dblJdC11 = 0.00033 * Math.sin((dblJdB31 * PI) / 180);
		var dblJdC21 = dblJdA11 + dblJdA21 + dblJdA31 + dblJdC11;
		var dblJdC31 = 2415020.75933 + dblJdC21;
		var dblJD1 = dblJdC31 + 0.5 + dblKoreksi1;
		var dblZJd1 = (0, trunc)(dblJD1);
		var dblEFJd1 = dblJD1 - dblZJd1;
		var dblAPJd1 = (0, trunc)((dblZJd1 - 1867216.25) / 36524.25);
		var dblAJd1 = dblZJd1 < 2299161 ? dblZJd1 : dblZJd1 + 1 + dblAPJd1 - (0, trunc)(dblAPJd1 / 4);
		var dblBJd1 = dblAJd1 + 1524;
		var dblCJd1 = (0, trunc)((dblBJd1 - 122.1) / 365.25);
		var dblDJd1 = (0, trunc)(365.25 * dblCJd1);
		var dblEJd1 = (0, trunc)((dblBJd1 - dblDJd1) / 30.6001);
		var dblTgl11 = dblBJd1 - dblDJd1 - (0, trunc)(30.6001 * dblEJd1) + dblEFJd1;
		var dblTgl21 = (0, trunc)(dblTgl11);
		var dblTgl31 = dblTgl11 - dblTgl21;
		var dblTgl41 = dblTgl31 * 24;
		var dblTgl51 = dblTgl41 + 7;
		var dblTglM1 = dblTgl51 <= 24 ? dblTgl21 : dblTgl21 + 1;
		var dblHasilBulan1 = dblEJd1 < 13.5 ? dblEJd1 - 1 : dblEJd1 - 13;
		var intTahun1 = dblHasilBulan1 < 2.5 ? (0, trunc)(dblCJd1 - 4715) : (0, trunc)(dblCJd1 - 4716);
		var newYear1 = intTahun1;
		var addYear1 = 0;
		var addMultiply1 = 0;
		if (intTahun1 >= 2038) {
			addMultiply1 = (0, intVal)((intTahun1 - 1982) / 56);
			addYear1 = addMultiply1 * 56;
			newYear1 = intTahun1 - addYear1;
		}
		var datHasil1 = (0, mktime)(0, 0, 0, dblHasilBulan1, dblTglM1, newYear1);
		var temp1 = (0, dateAdd)('d', 29, newYear1, dblHasilBulan1, dblTglM1);
		var temp2 = (0, dateAdd)('d', 29 * 2, newYear1, dblHasilBulan1, dblTglM1);
		var datFull2 = datHasil1 > datFull1 ? temp1 : temp2;
		var EdatFull = datFull2.split('-');
		var intIJST2 = 1;
		var intTanggal2 = (0, intVal)(EdatFull[2]);
		var intBulan2 = (0, intVal)(EdatFull[1]);
		var intArrTahun2 = (0, intVal)(EdatFull[0]) + addYear1;
		var intTa12 = intArrTahun2 % 4 === 0 ? 1 : 0;
		var intTa22 = intArrTahun2 % 100 === 0 ? 1 : 0;
		var intTa32 = intTa12 + intTa22;
		var dblKB2 = intTa32 > 0 ? 1 : 2;
		var dblK12 = (0, trunc)((275 * intBulan2) / 9);
		var dblK22 = (0, trunc)((intBulan2 + 9) / 12) * dblKB2;
		var dblK32 = dblK12 - dblK22 + intTanggal2 - 30;
		var dblK42 = dblK32 / 365.25 + (intArrTahun2 - 1900);
		var dblK52 = dblK42 * 12.3685;
		var dblK62 = dblK52 - (0, trunc)(dblK52);
		var dblK72 = dblK62 > 0.5 ? (0, trunc)(dblK52 + 1) : (0, trunc)(dblK52);
		var dblKN2 = intIJST2 === 1 ? dblK72 : dblK72 - 0.5;
		var dblT2 = dblKN2 / 1236.85;
		var dblM12 = 29.10535608 * dblKN2;
		var dblM22 = -0.000033 * dblT2 * dblT2;
		var dblM32 = -0.00000347 * dblT2 * dblT2 * dblT2;
		var dblM2 = (0, mod)(359.2242 + dblM12 + dblM22 + dblM32, 360);
		var dblMA12 = 385.81691806 * dblKN2;
		var dblMA22 = 0.0107306 * dblT2 * dblT2;
		var dblMA32 = 0.00001236 * dblT2 * dblT2 * dblT2;
		var dblMA2 = (0, mod)(306.0253 + dblMA12 + dblMA22 + dblMA32, 360);
		var dblF12 = 390.67050646 * dblKN2;
		var dblF22 = -0.0016528 * dblT2 * dblT2;
		var dblF32 = -0.00000239 * dblT2 * dblT2 * dblT2;
		var dblF2 = (0, mod)(21.2964 + dblF12 + dblF22 + dblF32, 360);
		var dblKRA12 = 0.1734 - 0.000393 * dblT2;
		var dblKRA22 = dblKRA12 * Math.sin((dblM2 * PI) / 180);
		var dblKRA32 = -0.4068 * Math.sin((dblMA2 * PI) / 180);
		var dblKRA42 = 0.0021 * Math.sin((2 * dblM2 * PI) / 180);
		var dblKRA52 = 0.0161 * Math.sin((2 * dblMA2 * PI) / 180);
		var dblKRA62 = -0.0004 * Math.sin((3 * dblMA2 * PI) / 180);
		var dblKORA2 = dblKRA22 + dblKRA32 + dblKRA42 + dblKRA52 + dblKRA62;
		var dblKRB12 = -0.0051 * Math.sin(((dblM2 + dblMA2) * PI) / 180);
		var dblKRB22 = -0.0074 * Math.sin(((dblM2 - dblMA2) * PI) / 180);
		var dblKRB32 = 0.0004 * Math.sin(((2 * dblF2 + dblM2) * PI) / 180);
		var dblKRB42 = -0.0004 * Math.sin(((2 * dblF2 - dblM2) * PI) / 180);
		var dblKRB52 = 0.0104 * Math.sin((2 * dblF2 * PI) / 180);
		var dblKORB2 = dblKRB12 + dblKRB22 + dblKRB32 + dblKRB42 + dblKRB52;
		var dblKC12 = -0.0006 * Math.sin(((2 * dblF2 + dblMA2) * PI) / 180);
		var dblKC22 = 0.001 * Math.sin(((2 * dblF2 - dblMA2) * PI) / 180);
		var dblKC32 = 0.0005 * Math.sin(((dblM2 + 2 * dblMA2) * PI) / 180);
		var dblKORC2 = dblKC12 + dblKC22 + dblKC32;
		var dblKoreksi2 = dblKORA2 + dblKORB2 + dblKORC2;
		var dblJdA12 = 29.53058868 * dblKN2;
		var dblJdA22 = 0.0001178 * dblT2 * dblT2 * dblT2;
		var dblJdA32 = -0.000000155 * dblT2 * dblT2 * dblT2;
		var dblJdB12 = 132.87 * dblT2;
		var dblJdB22 = 0.009173 * dblT2 * dblT2;
		var dblJdB32 = 166.56 + dblJdB12 - dblJdB22;
		var dblJdC12 = 0.00033 * Math.sin((dblJdB32 * PI) / 180);
		var dblJdC22 = dblJdA12 + dblJdA22 + dblJdA32 + dblJdC12;
		var dblJdC32 = 2415020.75933 + dblJdC22;
		var dblJD2 = dblJdC32 + 0.5 + dblKoreksi2;
		var dblZJd2 = (0, trunc)(dblJD2);
		var dblEFJd2 = dblJD2 - dblZJd2;
		var dblAPJd2 = (0, trunc)((dblZJd2 - 1867216.25) / 36524.25);
		var dblAJd2 = dblZJd2 < 2299161 ? dblZJd2 : dblZJd2 + 1 + dblAPJd2 - (0, trunc)(dblAPJd2 / 4);
		var dblBJd2 = dblAJd2 + 1524;
		var dblCJd2 = (0, trunc)((dblBJd2 - 122.1) / 365.25);
		var dblDJd2 = (0, trunc)(365.25 * dblCJd2);
		var dblEJd2 = (0, trunc)((dblBJd2 - dblDJd2) / 30.6001);
		var dblTgl12 = dblBJd2 - dblDJd2 - (0, trunc)(30.6001 * dblEJd2) + dblEFJd2;
		var dblTgl22 = (0, trunc)(dblTgl12);
		var dblTgl32 = dblTgl12 - dblTgl22;
		var dblTgl42 = dblTgl32 * 24;
		var dblTgl52 = dblTgl42 + 7;
		var dblTglM2 = dblTgl52 <= 24 ? dblTgl22 : dblTgl22 + 1;
		var dblHasilBulan2 = dblEJd2 < 13.5 ? dblEJd2 - 1 : dblEJd2 - 13;
		var intTahun2 = dblHasilBulan2 < 2.5 ? (0, trunc)(dblCJd2 - 4715) : (0, trunc)(dblCJd2 - 4716);
		var newYear2 = intTahun2;
		var addYear2 = 0;
		var addMultiply2 = 0;
		if (intTahun2 >= 2038) {
			addMultiply2 = (0, intVal)((intTahun2 - 1982) / 56);
			addYear2 = addMultiply2 * 56;
			newYear2 = intTahun2 - addYear2;
		}
		return (0, formatReadDate)(newYear2, dblHasilBulan2, dblTglM2);
	};
	China.prototype.Tahun = function (year) {
		return year + 551;
	};
	China.prototype.Shio = function (year) {
		return (year + 551) % 12;
	};
	China.prototype.Elemen = function (year) {
		return (0, intVal)(((year - 4) % 10) / 2);
	};
	return China;
}());
var Calendar = /** @class */ (function () {
	function Calendar(options) {
		this.islam = new Islam();
		this.buddha = new Buddha();
		this.hindu = new Hindu();
		this.china = new China();
		this.christian = new Christian();
		this.national = new National();
		this.defaultOptions = {
			timezone: 7,
			latitude: -6.9128,
			longitude: 107.6206,
			altitude: 10,
			weeklyFormat: true,
			include: {
				calendarTypes: [
					0,
					1,
				],
				addHolidays: [],
				addLeaves: [],
				remHolidays: [],
				remLeaves: [],
				showHoliday: true,
				showLeave: true,
				showImsakiyah: true
			}
		};
		if (!options) {
			this.options = this.defaultOptions;
		}
		else {
			this.options = options;
		}
	}
	Calendar.prototype._includeHoliday = function (options, year, masehiDate, hijriDate, dayCount) {
		var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
		var resultDate = {};
		resultDate.holidays = [];
		resultDate.leaves = [];
		var nationalBuruh = this.national.Buruh(year);
		var nationalKemerdekaan = this.national.Kemerdekaan(year);
		var nationalPancasila = this.national.Pancasila(year);
		var nationalTahunBaru = this.national.TahunBaru(year);
		var christianNatal = this.christian.Natal(year);
		var christianKenaikan = this.christian.Kenaikan(year);
		var christianWafat = this.christian.Wafat(year);
		var christianNatalBefore = this.christian.NatalBefore(year);
		var christianNatalAfter = this.christian.NatalAfter(year);
		var buddhaWaisak = this.buddha.Waisak(year);
		var tahunWaisak = this.buddha.Tahun(year);
		var hinduNyepi = this.hindu.Nyepi(year);
		var tahunNyepi = this.hindu.Tahun(year);
		var chinaImlek = this.china.Imlek(year);
		var tahunImlek = this.china.Tahun(year);
		var shioImlek = this.china.Shio(year);
		var elemenImlek = this.china.Elemen(year);
		var arrMasehiDate = masehiDate.split('-');
		var yearMasehiDate = (0, intVal)(arrMasehiDate[0]);
		var monthMasehiDate = (0, intVal)(arrMasehiDate[1]);
		var dayMasehiDate = (0, intVal)(arrMasehiDate[2]);
		var arrHijriDate = hijriDate.split('-');
		var yearHijriDate = (0, intVal)(arrHijriDate[0]);
		var monthHijriDate = (0, intVal)(arrHijriDate[1]);
		var dayHijriDate = (0, intVal)(arrHijriDate[2]);
		var dateMasehi = new Date(yearMasehiDate, monthMasehiDate - 1, dayMasehiDate, options.timezone);
		var weekDay = dateMasehi.getDay();
		resultDate.day = weekDay;
		if ((_a = options.include) === null || _a === void 0 ? void 0 : _a.showHoliday) {
			if (masehiDate === nationalTahunBaru) {
				resultDate.holidays.push({
					date: masehiDate,
					type: 0,
					name: 'tahun_baru_masehi',
					year: year,
					age: year,
				});
			}
			if (masehiDate === nationalBuruh) {
				resultDate.holidays.push({
					date: masehiDate,
					type: 0,
					name: 'buruh_nasional',
					year: year,
					age: year,
				});
			}
			if (masehiDate === nationalPancasila) {
				resultDate.holidays.push({
					date: masehiDate,
					type: 0,
					name: 'pancasila',
					year: year,
					age: year,
				});
			}
			if (masehiDate === nationalKemerdekaan) {
				resultDate.holidays.push({
					date: masehiDate,
					type: 0,
					name: 'kemerdekaan',
					year: year,
					age: year - 1945,
				});
			}
			if (masehiDate === christianNatal) {
				resultDate.holidays.push({
					date: masehiDate,
					type: 0,
					name: 'natal',
					year: year,
					age: year,
				});
			}
			if (masehiDate === christianWafat) {
				resultDate.holidays.push({
					date: masehiDate,
					type: 0,
					name: 'wafat_isa',
					year: year,
					age: year,
				});
			}
			if (masehiDate === christianKenaikan) {
				resultDate.holidays.push({
					date: masehiDate,
					type: 0,
					name: 'kenaikan_isa',
					year: year,
					age: year,
				});
			}
			if (masehiDate === hinduNyepi) {
				resultDate.holidays.push({
					date: masehiDate,
					type: 0,
					name: 'nyepi',
					year: year,
					age: tahunNyepi,
				});
			}
			if (masehiDate === buddhaWaisak) {
				resultDate.holidays.push({
					date: masehiDate,
					type: 0,
					name: 'waisak',
					year: year,
					age: tahunWaisak,
				});
			}
			if (masehiDate === chinaImlek) {
				resultDate.holidays.push({
					date: masehiDate,
					type: 0,
					name: 'imlek',
					year: year,
					age: tahunImlek,
					shio: shioImlek,
					element: elemenImlek,
				});
			}
			switch (monthHijriDate) {
				case 1:
					switch (dayHijriDate) {
						case 1:
							resultDate.holidays.push({
								date: masehiDate,
								type: 0,
								name: 'tahun_baru_islam',
								year: year,
								age: yearHijriDate
							});
							break;
					}
					break;
				case 3:
					switch (dayHijriDate) {
						case 12:
							resultDate.holidays.push({
								date: masehiDate,
								type: 0,
								name: 'maulid_nabi',
								year: year,
								age: yearHijriDate
							});
							break;
					}
					break;
				case 7:
					switch (dayHijriDate) {
						case 27:
							resultDate.holidays.push({
								date: masehiDate,
								type: 0,
								name: 'isra_miraj',
								year: year,
								age: yearHijriDate
							});
							break;
					}
					break;
				case 10:
					switch (dayHijriDate) {
						case 1:
							resultDate.holidays.push({
								date: masehiDate,
								type: 0,
								name: 'idul_fitri',
								year: year,
								age: yearHijriDate
							});
							break;
						case 2:
							resultDate.holidays.push({
								date: masehiDate,
								type: 0,
								name: 'idul_fitri',
								year: year,
								age: yearHijriDate
							});
							break;
					}
					break;
				case 12:
					switch (dayHijriDate) {
						case 10:
							resultDate.holidays.push({
								date: masehiDate,
								type: 0,
								name: 'idul_adha',
								year: year,
								age: yearHijriDate
							});
							break;
					}
					break;
			}
		}
		if ((_b = options.include) === null || _b === void 0 ? void 0 : _b.showLeave) {
			if (masehiDate === christianNatalAfter) {
				if (weekDay >= 1 && weekDay <= 5) {
					resultDate.leaves.push({
						date: masehiDate,
						type: 0,
						name: 'natal',
						year: year,
					});
				}
			}
			switch (monthHijriDate) {
				case 10:
					switch (dayHijriDate) {
						case 3:
							if (weekDay >= 1 && weekDay <= 5) {
								resultDate.leaves.push({
									date: masehiDate,
									type: 0,
									name: 'idul_fitri',
									year: year,
									age: yearHijriDate
								});
							}
							break;
						case 4:
							if (weekDay >= 1 && weekDay <= 5) {
								resultDate.leaves.push({
									date: masehiDate,
									type: 0,
									name: 'idul_fitri',
									year: year,
									age: yearHijriDate
								});
							}
							break;
					}
					break;
				case 9:
					if (dayHijriDate === dayCount - 1) {
						if (weekDay === 1) {
							resultDate.leaves.push({
								date: masehiDate,
								type: 0,
								name: 'idul_fitri',
								year: year,
								age: yearHijriDate
							});
						}
					}
					if (dayHijriDate === dayCount) {
						if (weekDay === 1 || weekDay === 2 || weekDay === 4 || weekDay === 5) {
							resultDate.leaves.push({
								date: masehiDate,
								type: 0,
								name: 'idul_fitri',
								year: year,
								age: yearHijriDate
							});
						}
					}
					break;
			}
		}
		if ((_c = options.include) === null || _c === void 0 ? void 0 : _c.addHolidays) {
			if (((_d = options.include) === null || _d === void 0 ? void 0 : _d.addHolidays.length) > 0) {
				for (var _i = 0, _q = (_e = options.include) === null || _e === void 0 ? void 0 : _e.addHolidays; _i < _q.length; _i++) {
					var newHoliday = _q[_i];
					if (masehiDate === newHoliday.date) {
						resultDate.holidays.push({
							date: masehiDate,
							name: (_f = newHoliday.name) !== null && _f !== void 0 ? _f : '',
							year: year,
							type: (_g = newHoliday.type) !== null && _g !== void 0 ? _g : 1,
							description: (_h = newHoliday.description) !== null && _h !== void 0 ? _h : '',
						});
					}
				}
			}
		}
		if ((_j = options.include) === null || _j === void 0 ? void 0 : _j.remHolidays) {
			if (((_k = options.include) === null || _k === void 0 ? void 0 : _k.remHolidays.length) > 0) {
				if (resultDate.holidays) {
					if (resultDate.holidays.length > 0) {
						for (var _r = 0, _s = resultDate.holidays; _r < _s.length; _r++) {
							var aHoliday = _s[_r];
							for (var _t = 0, _u = (_l = options.include) === null || _l === void 0 ? void 0 : _l.remHolidays; _t < _u.length; _t++) {
								var remHoliday = _u[_t];
								if (aHoliday.date === remHoliday.date) {
									delete resultDate.holiday;
								}
							}
						}
					}
				}
			}
		}
		if ((_m = options.include) === null || _m === void 0 ? void 0 : _m.remLeaves) {
			if (((_o = options.include) === null || _o === void 0 ? void 0 : _o.remLeaves.length) > 0) {
				if (resultDate.leaves) {
					if (resultDate.leaves.length > 0) {
						for (var _v = 0, _w = resultDate.leaves; _v < _w.length; _v++) {
							var aLeave = _w[_v];
							for (var _x = 0, _y = (_p = options.include) === null || _p === void 0 ? void 0 : _p.remLeaves; _x < _y.length; _x++) {
								var remLeave = _y[_x];
								if (aLeave.date === remLeave.date) {
									delete resultDate.leave;
								}
							}
						}
					}
				}
			}
		}
		if (resultDate.holidays.length == 0) {
			delete resultDate.holidays;
		}
		if (resultDate.leaves.length == 0) {
			delete resultDate.leaves;
		}
		if (resultDate.holidays) {
			if (resultDate.holidays.length > 0) {
				for (var _z = 0, _0 = resultDate.holidays; _z < _0.length; _z++) {
					var aHoliday = _0[_z];
					delete aHoliday.date;
				}
			}
		}
		if (resultDate.leaves) {
			if (resultDate.leaves.length > 0) {
				for (var _1 = 0, _2 = resultDate.leaves; _1 < _2.length; _1++) {
					var aLeave = _2[_1];
					delete aLeave.date;
				}
			}
		}
		return resultDate;
	};
	Calendar.prototype.KalenderMasehi = function (year, month, day) {
		var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20;
		if (month === void 0) { month = 0; }
		if (day === void 0) { day = 0; }
		var include = {
			calendarTypes: (_c = (_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.include) === null || _b === void 0 ? void 0 : _b.calendarTypes) !== null && _c !== void 0 ? _c : (_d = this.defaultOptions.include) === null || _d === void 0 ? void 0 : _d.calendarTypes,
			showHoliday: (_g = (_f = (_e = this.options) === null || _e === void 0 ? void 0 : _e.include) === null || _f === void 0 ? void 0 : _f.showHoliday) !== null && _g !== void 0 ? _g : (_h = this.defaultOptions.include) === null || _h === void 0 ? void 0 : _h.showHoliday,
			showLeave: (_l = (_k = (_j = this.options) === null || _j === void 0 ? void 0 : _j.include) === null || _k === void 0 ? void 0 : _k.showLeave) !== null && _l !== void 0 ? _l : (_m = this.defaultOptions.include) === null || _m === void 0 ? void 0 : _m.showLeave,
			showImsakiyah: (_q = (_p = (_o = this.options) === null || _o === void 0 ? void 0 : _o.include) === null || _p === void 0 ? void 0 : _p.showImsakiyah) !== null && _q !== void 0 ? _q : (_r = this.defaultOptions.include) === null || _r === void 0 ? void 0 : _r.showImsakiyah,
			addHolidays: (_u = (_t = (_s = this.options) === null || _s === void 0 ? void 0 : _s.include) === null || _t === void 0 ? void 0 : _t.addHolidays) !== null && _u !== void 0 ? _u : (_v = this.defaultOptions.include) === null || _v === void 0 ? void 0 : _v.addHolidays,
			addLeaves: (_y = (_x = (_w = this.options) === null || _w === void 0 ? void 0 : _w.include) === null || _x === void 0 ? void 0 : _x.addLeaves) !== null && _y !== void 0 ? _y : (_z = this.defaultOptions.include) === null || _z === void 0 ? void 0 : _z.addLeaves,
			remHolidays: (_2 = (_1 = (_0 = this.options) === null || _0 === void 0 ? void 0 : _0.include) === null || _1 === void 0 ? void 0 : _1.remHolidays) !== null && _2 !== void 0 ? _2 : (_3 = this.defaultOptions.include) === null || _3 === void 0 ? void 0 : _3.remHolidays,
			remLeaves: (_6 = (_5 = (_4 = this.options) === null || _4 === void 0 ? void 0 : _4.include) === null || _5 === void 0 ? void 0 : _5.remLeaves) !== null && _6 !== void 0 ? _6 : (_7 = this.defaultOptions.include) === null || _7 === void 0 ? void 0 : _7.remLeaves,
		};
		var months = [];
		var startMonth = month - 1;
		var endMonth = month;
		if (month === 0) {
			startMonth = 0;
			endMonth = 12;
		}
		var options = {
			timezone: (_9 = (_8 = this.options) === null || _8 === void 0 ? void 0 : _8.timezone) !== null && _9 !== void 0 ? _9 : this.defaultOptions.timezone,
			latitude: (_11 = (_10 = this.options) === null || _10 === void 0 ? void 0 : _10.latitude) !== null && _11 !== void 0 ? _11 : this.defaultOptions.latitude,
			longitude: (_13 = (_12 = this.options) === null || _12 === void 0 ? void 0 : _12.longitude) !== null && _13 !== void 0 ? _13 : this.defaultOptions.longitude,
			altitude: (_15 = (_14 = this.options) === null || _14 === void 0 ? void 0 : _14.altitude) !== null && _15 !== void 0 ? _15 : this.defaultOptions.altitude,
			weeklyFormat: (_17 = (_16 = this.options) === null || _16 === void 0 ? void 0 : _16.weeklyFormat) !== null && _17 !== void 0 ? _17 : this.defaultOptions.weeklyFormat,
			include: include
		};
		var hisab = this.islam.Hisab(year, options.latitude, options.longitude, options.timezone, options.altitude);
		for (var m = startMonth; m < endMonth; m++) {
			var dates = [];
			var firstMonthDate = new Date(year, m, 1, options.timezone);
			var lastMonthDate = new Date(year, m + 1, 0, options.timezone);
			var firstWeek = firstMonthDate.getDay();
			var lastWeek = lastMonthDate.getDay();
			var firstDate = (0, dateAdd)('d', 0, year, m + 1, 1);
			var lastDate = (0, dateAdd)('d', 0, year, m + 2, 0);
			if (options.weeklyFormat) {
				firstDate = (0, dateAdd)('d', -firstWeek, year, m + 1, 1);
				lastDate = (0, dateAdd)('d', 6 - lastWeek, year, m + 2, 0);
			}
			if (day > 0) {
				firstDate = (0, dateAdd)('d', 0, year, m + 1, day);
				lastDate = firstDate;
			}
			var arrFirstDate = firstDate.split('-');
			var yearFirstDate = (0, intVal)(arrFirstDate[0]);
			var monthFirstDate = (0, intVal)(arrFirstDate[1]);
			var dayFirstDate = (0, intVal)(arrFirstDate[2]);
			var currMonth = m + 1;
			var _loop_1 = function (d) {
				var itemDate = (0, dateAdd)('d', d, yearFirstDate, monthFirstDate, dayFirstDate);
				var itemHisab = hisab.filter(function (el) { return el.masehi === itemDate; });
				var masehiDate = itemHisab[0].masehi;

				var hijriDate = itemHisab[0].hijri;
				var dayCount = itemHisab[0].daycount;
				var resultDate = {};

				var arrMasehiDate = masehiDate.split('-');
				var monthMasehi = (0, intVal)(arrMasehiDate[1]);

				if (monthMasehi < currMonth ){
					resultDate.type = 'before';
				} else if (monthMasehi === currMonth ){
					resultDate.type = 'current';
				} else {
					resultDate.type = 'after';
				}

				resultDate.masehi = masehiDate;
				resultDate.holidays = [];
				resultDate.leaves = [];
				resultDate.imsakiyah = [];
				(_19 = (_18 = options.include) === null || _18 === void 0 ? void 0 : _18.calendarTypes) === null || _19 === void 0 ? void 0 : _19.forEach(function (e) {
					if (e === 1) {
						resultDate.hijri = hijriDate;
					}
				});
				var includeHoliday = this_1._includeHoliday(options, year, masehiDate, hijriDate, dayCount);
				resultDate.day = includeHoliday.day;
				resultDate.holidays = includeHoliday.holidays;
				resultDate.leaves = includeHoliday.leaves;
				if (resultDate.holidays) {
					if (resultDate.holidays.length == 0) {
						delete resultDate.holidays;
					}
				}
				if (resultDate.leaves) {
					if (resultDate.leaves.length == 0) {
						delete resultDate.leaves;
					}
				}
				if (resultDate.holidays) {
					if (resultDate.holidays.length > 0) {
						for (var _i = 0, _21 = resultDate.holidays; _i < _21.length; _i++) {
							var aHoliday = _21[_i];
							delete aHoliday.date;
						}
					}
				}
				if (resultDate.leaves) {
					if (resultDate.leaves.length > 0) {
						for (var _22 = 0, _23 = resultDate.leaves; _22 < _23.length; _22++) {
							var aLeave = _23[_22];
							delete aLeave.date;
						}
					}
				}
				if ((_20 = options.include) === null || _20 === void 0 ? void 0 : _20.showImsakiyah) {
					var arrMasehiDate = masehiDate.split('-');
					var yearMasehi = (0, intVal)(arrMasehiDate[0]);
					var monthMasehi = (0, intVal)(arrMasehiDate[1]);
					var dayMasehi = (0, intVal)(arrMasehiDate[2]);
					var imsakiyah = { ashar: '', dhuha: '', dhuhur: '', imsak: '', isya: '', maghrib: '', shubuh: '', syuruq: '' };
					imsakiyah = this_1.Imsakiyah(yearMasehi, monthMasehi, dayMasehi);
					delete imsakiyah.date;
					resultDate.imsakiyah = imsakiyah;
				}
				dates.push(resultDate);
				if (itemDate === lastDate)
					return "break";
			};
			var this_1 = this;
			for (var d = 0; d < 43; d++) {
				var state_1 = _loop_1(d);
				if (state_1 === "break")
					break;
			}
			months.push({
				month: m + 1,
				dates: dates
			});
		}
		return { request: { year: year, month: month, day: day }, options: options, data: months };
	};
	Calendar.prototype.LiburMasehi = function (year, month, day) {
		var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18;
		if (month === void 0) { month = 0; }
		if (day === void 0) { day = 0; }
		var include = {
			calendarTypes: (_c = (_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.include) === null || _b === void 0 ? void 0 : _b.calendarTypes) !== null && _c !== void 0 ? _c : (_d = this.defaultOptions.include) === null || _d === void 0 ? void 0 : _d.calendarTypes,
			showHoliday: (_g = (_f = (_e = this.options) === null || _e === void 0 ? void 0 : _e.include) === null || _f === void 0 ? void 0 : _f.showHoliday) !== null && _g !== void 0 ? _g : (_h = this.defaultOptions.include) === null || _h === void 0 ? void 0 : _h.showHoliday,
			showLeave: (_l = (_k = (_j = this.options) === null || _j === void 0 ? void 0 : _j.include) === null || _k === void 0 ? void 0 : _k.showLeave) !== null && _l !== void 0 ? _l : (_m = this.defaultOptions.include) === null || _m === void 0 ? void 0 : _m.showLeave,
			showImsakiyah: (_q = (_p = (_o = this.options) === null || _o === void 0 ? void 0 : _o.include) === null || _p === void 0 ? void 0 : _p.showImsakiyah) !== null && _q !== void 0 ? _q : (_r = this.defaultOptions.include) === null || _r === void 0 ? void 0 : _r.showImsakiyah,
			addHolidays: (_u = (_t = (_s = this.options) === null || _s === void 0 ? void 0 : _s.include) === null || _t === void 0 ? void 0 : _t.addHolidays) !== null && _u !== void 0 ? _u : (_v = this.defaultOptions.include) === null || _v === void 0 ? void 0 : _v.addHolidays,
			addLeaves: (_y = (_x = (_w = this.options) === null || _w === void 0 ? void 0 : _w.include) === null || _x === void 0 ? void 0 : _x.addLeaves) !== null && _y !== void 0 ? _y : (_z = this.defaultOptions.include) === null || _z === void 0 ? void 0 : _z.addLeaves,
			remHolidays: (_2 = (_1 = (_0 = this.options) === null || _0 === void 0 ? void 0 : _0.include) === null || _1 === void 0 ? void 0 : _1.remHolidays) !== null && _2 !== void 0 ? _2 : (_3 = this.defaultOptions.include) === null || _3 === void 0 ? void 0 : _3.remHolidays,
			remLeaves: (_6 = (_5 = (_4 = this.options) === null || _4 === void 0 ? void 0 : _4.include) === null || _5 === void 0 ? void 0 : _5.remLeaves) !== null && _6 !== void 0 ? _6 : (_7 = this.defaultOptions.include) === null || _7 === void 0 ? void 0 : _7.remLeaves,
		};
		var months = [];
		var startMonth = month - 1;
		var endMonth = month;
		if (month === 0) {
			startMonth = 0;
			endMonth = 12;
		}
		var options = {
			timezone: (_9 = (_8 = this.options) === null || _8 === void 0 ? void 0 : _8.timezone) !== null && _9 !== void 0 ? _9 : this.defaultOptions.timezone,
			latitude: (_11 = (_10 = this.options) === null || _10 === void 0 ? void 0 : _10.latitude) !== null && _11 !== void 0 ? _11 : this.defaultOptions.latitude,
			longitude: (_13 = (_12 = this.options) === null || _12 === void 0 ? void 0 : _12.longitude) !== null && _13 !== void 0 ? _13 : this.defaultOptions.longitude,
			altitude: (_15 = (_14 = this.options) === null || _14 === void 0 ? void 0 : _14.altitude) !== null && _15 !== void 0 ? _15 : this.defaultOptions.altitude,
			weeklyFormat: (_17 = (_16 = this.options) === null || _16 === void 0 ? void 0 : _16.weeklyFormat) !== null && _17 !== void 0 ? _17 : this.defaultOptions.weeklyFormat,
			include: include
		};
		var hisab = this.islam.Hisab(year, options.latitude, options.longitude, options.timezone, options.altitude);
		for (var m = startMonth; m < endMonth; m++) {
			var holidays = [];
			var leaves = [];
			var firstDate = (0, dateAdd)('d', 0, year, m + 1, 1);
			var lastDate = (0, dateAdd)('d', 0, year, m + 2, 0);
			if (day > 0) {
				var maxDay = (0, daysInMonth)(year, m + 1);
				if (day > maxDay)
					day = maxDay;
				firstDate = (0, dateAdd)('d', 0, year, m + 1, day);
				lastDate = firstDate;
			}
			var arrFirstDate = firstDate.split('-');
			var yearFirstDate = (0, intVal)(arrFirstDate[0]);
			var monthFirstDate = (0, intVal)(arrFirstDate[1]);
			var dayFirstDate = (0, intVal)(arrFirstDate[2]);
			var _loop_2 = function (d) {
				var itemDate = (0, dateAdd)('d', d, yearFirstDate, monthFirstDate, dayFirstDate);
				var itemHisab = hisab.filter(function (el) { return el.masehi === itemDate; });
				var masehiDate = itemHisab[0].masehi;
				var hijriDate = itemHisab[0].hijri;
				var dayCount = itemHisab[0].daycount;
				var resultDate = {};
				resultDate.masehi = masehiDate;
				resultDate.holidays = [];
				resultDate.leaves = [];
				var includeHoliday = this_2._includeHoliday(options, year, masehiDate, hijriDate, dayCount);
				resultDate.holidays = includeHoliday.holidays;
				resultDate.leaves = includeHoliday.leaves;
				if (resultDate.holidays) {
					if (resultDate.holidays.length > 0) {
						holidays.push(resultDate);
					}
					if (resultDate.holidays.length == 0) {
						delete resultDate.holidays;
					}
				}
				if (resultDate.leaves) {
					if (resultDate.leaves.length > 0) {
						leaves.push(resultDate);
					}
					if (resultDate.leaves.length == 0) {
						delete resultDate.leaves;
					}
				}
				if (itemDate === lastDate)
					return "break";
			};
			var this_2 = this;
			for (var d = 0; d < 43; d++) {
				var state_2 = _loop_2(d);
				if (state_2 === "break")
					break;
			}
			var itemResult = {
				month: m + 1,
				holidays: holidays,
				leaves: leaves
			};
			if (!((_18 = options.include) === null || _18 === void 0 ? void 0 : _18.showLeave)) {
				itemResult = {
					month: m + 1,
					holidays: holidays,
					leaves: leaves
				};
			}
			months.push(itemResult);
		}
		return { request: { year: year, month: month, day: day }, options: options, data: months };
	};
	Calendar.prototype.KalenderHijriyah = function (year, month, day) {
		var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19;
		if (month === void 0) { month = 0; }
		if (day === void 0) { day = 0; }
		var include = {
			calendarTypes: (_c = (_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.include) === null || _b === void 0 ? void 0 : _b.calendarTypes) !== null && _c !== void 0 ? _c : (_d = this.defaultOptions.include) === null || _d === void 0 ? void 0 : _d.calendarTypes,
			showHoliday: (_g = (_f = (_e = this.options) === null || _e === void 0 ? void 0 : _e.include) === null || _f === void 0 ? void 0 : _f.showHoliday) !== null && _g !== void 0 ? _g : (_h = this.defaultOptions.include) === null || _h === void 0 ? void 0 : _h.showHoliday,
			showLeave: (_l = (_k = (_j = this.options) === null || _j === void 0 ? void 0 : _j.include) === null || _k === void 0 ? void 0 : _k.showLeave) !== null && _l !== void 0 ? _l : (_m = this.defaultOptions.include) === null || _m === void 0 ? void 0 : _m.showLeave,
			showImsakiyah: (_q = (_p = (_o = this.options) === null || _o === void 0 ? void 0 : _o.include) === null || _p === void 0 ? void 0 : _p.showImsakiyah) !== null && _q !== void 0 ? _q : (_r = this.defaultOptions.include) === null || _r === void 0 ? void 0 : _r.showImsakiyah,
			addHolidays: (_u = (_t = (_s = this.options) === null || _s === void 0 ? void 0 : _s.include) === null || _t === void 0 ? void 0 : _t.addHolidays) !== null && _u !== void 0 ? _u : (_v = this.defaultOptions.include) === null || _v === void 0 ? void 0 : _v.addHolidays,
			addLeaves: (_y = (_x = (_w = this.options) === null || _w === void 0 ? void 0 : _w.include) === null || _x === void 0 ? void 0 : _x.addLeaves) !== null && _y !== void 0 ? _y : (_z = this.defaultOptions.include) === null || _z === void 0 ? void 0 : _z.addLeaves,
			remHolidays: (_2 = (_1 = (_0 = this.options) === null || _0 === void 0 ? void 0 : _0.include) === null || _1 === void 0 ? void 0 : _1.remHolidays) !== null && _2 !== void 0 ? _2 : (_3 = this.defaultOptions.include) === null || _3 === void 0 ? void 0 : _3.remHolidays,
			remLeaves: (_6 = (_5 = (_4 = this.options) === null || _4 === void 0 ? void 0 : _4.include) === null || _5 === void 0 ? void 0 : _5.remLeaves) !== null && _6 !== void 0 ? _6 : (_7 = this.defaultOptions.include) === null || _7 === void 0 ? void 0 : _7.remLeaves,
		};
		var months = [];
		var startMonth = month - 1;
		var endMonth = month;
		if (month === 0) {
			startMonth = 0;
			endMonth = 12;
		}
		var options = {
			timezone: (_9 = (_8 = this.options) === null || _8 === void 0 ? void 0 : _8.timezone) !== null && _9 !== void 0 ? _9 : this.defaultOptions.timezone,
			latitude: (_11 = (_10 = this.options) === null || _10 === void 0 ? void 0 : _10.latitude) !== null && _11 !== void 0 ? _11 : this.defaultOptions.latitude,
			longitude: (_13 = (_12 = this.options) === null || _12 === void 0 ? void 0 : _12.longitude) !== null && _13 !== void 0 ? _13 : this.defaultOptions.longitude,
			altitude: (_15 = (_14 = this.options) === null || _14 === void 0 ? void 0 : _14.altitude) !== null && _15 !== void 0 ? _15 : this.defaultOptions.altitude,
			weeklyFormat: (_17 = (_16 = this.options) === null || _16 === void 0 ? void 0 : _16.weeklyFormat) !== null && _17 !== void 0 ? _17 : this.defaultOptions.weeklyFormat,
			include: include
		};
		var hijriToMasehi = this.islam.HijriToMasehi(year, 1, 1);
		var arrMasehiDate = hijriToMasehi.split('-');
		var yearMasehi = (0, intVal)(arrMasehiDate[0]);
		var monthMasehi = (0, intVal)(arrMasehiDate[1]);
		var dayMasehi = (0, intVal)(arrMasehiDate[2]);
		if (monthMasehi > 5) {
			yearMasehi += 1;
		}
		var hisab = this.islam.Hisab(yearMasehi, options.latitude, options.longitude, options.timezone, options.altitude);
		var _loop_3 = function (m) {
			var dates = [];
			var startHijriDate = (0, formatReadDate)(year, m + 1, 1);
			var itemHisabStart = hisab.filter(function (el) { return el.hijri === startHijriDate; });
			var startMasehiDate = itemHisabStart[0].masehi;
			var dayCount = itemHisabStart[0].daycount;
			var endHijriDate = (0, formatReadDate)(year, m + 1, dayCount);
			var itemHisabEnd = hisab.filter(function (el) { return el.hijri === endHijriDate; });
			var endMasehiDate = itemHisabEnd[0].masehi;
			var arrStartMasehiDate = startMasehiDate.split('-');
			var yearStartMasehiDate = (0, intVal)(arrStartMasehiDate[0]);
			var monthStartMasehiDate = (0, intVal)(arrStartMasehiDate[1]);
			var dayStartMasehiDate = (0, intVal)(arrStartMasehiDate[2]);
			var arrEndtMasehiDate = endMasehiDate.split('-');
			var yearEndMasehiDate = (0, intVal)(arrEndtMasehiDate[0]);
			var monthEndMasehiDate = (0, intVal)(arrEndtMasehiDate[1]);
			var dayEndMasehiDate = (0, intVal)(arrEndtMasehiDate[2]);
			var firstMonthDate = new Date(yearStartMasehiDate, monthStartMasehiDate - 1, dayStartMasehiDate, options.timezone);
			var lastMonthDate = new Date(yearEndMasehiDate, monthEndMasehiDate - 1, dayEndMasehiDate, options.timezone);
			var firstWeekMasehi = firstMonthDate.getDay();
			var lastWeekMasehi = lastMonthDate.getDay();
			if (options.weeklyFormat) {
				startMasehiDate = (0, dateAdd)('d', -firstWeekMasehi, yearStartMasehiDate, monthStartMasehiDate, dayStartMasehiDate);
				endMasehiDate = (0, dateAdd)('d', 6 - lastWeekMasehi, yearEndMasehiDate, monthEndMasehiDate, dayEndMasehiDate);
			}
			if (day > 0) {
				if (day > dayCount)
					day = dayCount;
				startHijriDate = (0, formatReadDate)(year, m + 1, day);
				itemHisabStart = hisab.filter(function (el) { return el.hijri === startHijriDate; });
				startMasehiDate = itemHisabStart[0].masehi;
				endMasehiDate = itemHisabStart[0].masehi;
			}
			itemHisabStart = hisab.filter(function (el) { return el.masehi === startMasehiDate; });
			itemHisabEnd = hisab.filter(function (el) { return el.masehi === endMasehiDate; });
			var arrFirstDate = startMasehiDate.split('-');
			var yearFirstDate = (0, intVal)(arrFirstDate[0]);
			var monthFirstDate = (0, intVal)(arrFirstDate[1]);
			var dayFirstDate = (0, intVal)(arrFirstDate[2]);
			var _loop_4 = function (d) {
				var itemDate = (0, dateAdd)('d', d, yearFirstDate, monthFirstDate, dayFirstDate);
				var itemHisab = hisab.filter(function (el) { return el.masehi === itemDate; });
				var masehiDate = itemHisab[0].masehi;
				var hijriDate = itemHisab[0].hijri;
				var dayCount_1 = itemHisab[0].daycount;
				var arrMasehiDate_1 = masehiDate.split('-');
				var yearMasehiDate = (0, intVal)(arrMasehiDate_1[0]);
				var resultDate = {};
				resultDate.hijri = hijriDate;
				resultDate.masehi = masehiDate;
				resultDate.holidays = [];
				resultDate.leaves = [];
				(_19 = (_18 = options.include) === null || _18 === void 0 ? void 0 : _18.calendarTypes) === null || _19 === void 0 ? void 0 : _19.forEach(function (e) {
					if (e === 0) {
						resultDate.masehi = masehiDate;
					}
				});
				var includeHoliday = this_3._includeHoliday(options, yearMasehiDate, masehiDate, hijriDate, dayCount_1);
				resultDate.day = includeHoliday.day;
				resultDate.holidays = includeHoliday.holidays;
				resultDate.leaves = includeHoliday.leaves;
				if (resultDate.holidays) {
					if (resultDate.holidays.length == 0) {
						delete resultDate.holidays;
					}
				}
				if (resultDate.leaves) {
					if (resultDate.leaves.length == 0) {
						delete resultDate.leaves;
					}
				}
				if (resultDate.holidays) {
					if (resultDate.holidays.length > 0) {
						for (var _i = 0, _20 = resultDate.holidays; _i < _20.length; _i++) {
							var aHoliday = _20[_i];
							delete aHoliday.date;
						}
					}
				}
				if (resultDate.leaves) {
					if (resultDate.leaves.length > 0) {
						for (var _21 = 0, _22 = resultDate.leaves; _21 < _22.length; _21++) {
							var aLeave = _22[_21];
							delete aLeave.date;
						}
					}
				}
				dates.push(resultDate);
				if (itemDate === endMasehiDate)
					return "break";
			};
			for (var d = 0; d < 43; d++) {
				var state_3 = _loop_4(d);
				if (state_3 === "break")
					break;
			}
			months.push({
				month: m + 1,
				dates: dates
			});
		};
		var this_3 = this;
		for (var m = startMonth; m < endMonth; m++) {
			_loop_3(m);
		}
		return { request: { year: year, month: month, day: day }, options: options, data: months };
	};
	Calendar.prototype.MasehiKeHijriyah = function (year, month, day) {
		var _a, _b, _c, _d, _e, _f, _g, _h;
		var options = {
			timezone: (_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.timezone) !== null && _b !== void 0 ? _b : this.defaultOptions.timezone,
			latitude: (_d = (_c = this.options) === null || _c === void 0 ? void 0 : _c.latitude) !== null && _d !== void 0 ? _d : this.defaultOptions.latitude,
			longitude: (_f = (_e = this.options) === null || _e === void 0 ? void 0 : _e.longitude) !== null && _f !== void 0 ? _f : this.defaultOptions.longitude,
			altitude: (_h = (_g = this.options) === null || _g === void 0 ? void 0 : _g.altitude) !== null && _h !== void 0 ? _h : this.defaultOptions.altitude
		};
		return this.islam.MasehiToHijri(year, month, day, options.latitude, options.longitude, options.timezone, options.altitude);
	};
	Calendar.prototype.HijriyahKeMasehi = function (year, month, day) {
		return this.islam.HijriToMasehi(year, month, day);
	};
	Calendar.prototype.Imsakiyah = function (year, month, day, shubuh, thulu, dhuha, ihtiyat, dhuhur, ashar, isya, imsak) {
		var _a, _b, _c, _d, _e, _f, _g, _h;
		if (shubuh === void 0) { shubuh = 20; }
		if (thulu === void 0) { thulu = 1; }
		if (dhuha === void 0) { dhuha = 4.5; }
		if (ihtiyat === void 0) { ihtiyat = 1; }
		if (dhuhur === void 0) { dhuhur = 4; }
		if (ashar === void 0) { ashar = 1; }
		if (isya === void 0) { isya = 18; }
		if (imsak === void 0) { imsak = 10; }
		var options = {
			timezone: (_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.timezone) !== null && _b !== void 0 ? _b : this.defaultOptions.timezone,
			latitude: (_d = (_c = this.options) === null || _c === void 0 ? void 0 : _c.latitude) !== null && _d !== void 0 ? _d : this.defaultOptions.latitude,
			longitude: (_f = (_e = this.options) === null || _e === void 0 ? void 0 : _e.longitude) !== null && _f !== void 0 ? _f : this.defaultOptions.longitude,
			altitude: (_h = (_g = this.options) === null || _g === void 0 ? void 0 : _g.altitude) !== null && _h !== void 0 ? _h : this.defaultOptions.altitude
		};
		return this.islam.Imsakiyah(year, month, day, options.latitude, options.longitude, options.timezone, options.altitude, shubuh, thulu, dhuha, ihtiyat, dhuhur, ashar, isya, imsak);
	};
	Calendar.prototype.Waisak = function (year) {
		return this.buddha.Waisak(year);
	};
	;
	Calendar.prototype.TahunBuddha = function (year) {
		return this.buddha.Tahun(year);
	};
	;
	Calendar.prototype.Nyepi = function (year) {
		return this.hindu.Nyepi(year);
	};
	;
	Calendar.prototype.TahunWaisak = function (year) {
		return this.hindu.Tahun(year);
	};
	;
	Calendar.prototype.Imlek = function (year) {
		return this.china.Imlek(year);
	};
	;
	Calendar.prototype.TahunImlek = function (year) {
		return this.china.Tahun(year);
	};
	;
	Calendar.prototype.ShioImlek = function (year) {
		return this.china.Shio(year);
	};
	;
	Calendar.prototype.ElementImlek = function (year) {
		return this.china.Elemen(year);
	};
	;
	Calendar.prototype.TahunBaru = function (year) {
		return this.national.TahunBaru(year);
	};
	;
	Calendar.prototype.Kemerdekaan = function (year) {
		return this.national.Kemerdekaan(year);
	};
	;
	Calendar.prototype.Buruh = function (year) {
		return this.national.Buruh(year);
	};
	;
	Calendar.prototype.Pancasila = function (year) {
		return this.national.Pancasila(year);
	};
	;
	Calendar.prototype.Paskah = function (year) {
		return this.christian.Paskah(year);
	};
	;
	Calendar.prototype.WafatIsa = function (year) {
		return this.christian.Wafat(year);
	};
	;
	Calendar.prototype.KenaikanIsa = function (year) {
		return this.christian.Kenaikan(year);
	};
	;
	Calendar.prototype.Natal = function (year) {
		return this.christian.Natal(year);
	};
	;
	return Calendar;
}());

(function($){
	var dateValue = function(yearnum, monthnum, daynum, format) {
		var datval;
		daynum = twoDigit(daynum);
		monthnum = twoDigit(monthnum);
		if (format.toLowerCase() == 'yyyy-mm-dd'){
			datval = yearnum + "-" + monthnum + "-" + daynum;
		} else if (format.toLowerCase() == 'dd-mm-yyyy'){
			datval = daynum + "-" + monthnum + "-" + yearnum;
		} else if (format.toLowerCase() == 'mm-dd-yyyy'){
			datval = monthnum + "-" + daynum + "-" + yearnum;
		} else if (format.toLowerCase() == 'yyyy/mm/dd'){
			datval = yearnum + "/" + monthnum + "/" + daynum;
		} else if (format.toLowerCase() == 'dd/mm/yyyy'){
			datval = daynum + "/" + monthnum + "/" + yearnum;
		} else if (format.toLowerCase() == 'mm/dd/yyyy'){
			datval = monthnum + "/" + daynum + "/" + yearnum;
		} else {
			datval = yearnum + "-" + monthnum + "-" + daynum;
		}
		return datval;
	};
	var twoDigit = function(number) {
		return number >= 10 ? number : "0" + number.toString();
	};
	var convertHolidayName = function (holiday) {
		var arrHolidayName = [
			{key: 'tahun_baru_masehi', name: 'Tahun Baru Masehi'},
			{key: 'wafat_isa', name: 'Wafat Isa Almasih'},
			{key: 'kenaikan_isa', name: 'Kenaikan Isa Almasih'},
			{key: 'nyepi', name: 'Hari Raya Nyepi'},
			{key: 'waisak', name: 'Hari Raya Waisak'},
			{key: 'imlek', name: 'Hari Raya Imlek'},
			{key: 'idul_fitri', name: 'Hari Raya Idul Fitri'},
			{key: 'idul_adha', name: 'Hari Raya Idul Adha'},
			{key: 'maulid_nabi', name: 'Maulid Nabi Muhammad'},
			{key: 'isra_miraj', name: 'Isra Miraj Nabi Muhammad'},
			{key: 'tahun_baru_islam', name: 'Tahun Baru Hijriyah'},
			{key: 'natal', name: 'Hari Raya Natal'},
			{key: 'buruh_nasional', name: 'Hari Buruh Nasional'},
			{key: 'kemerdekaan', name: 'Hari Proklamasi Kemerdekaan'},
			{key: 'pancasila', name: 'Hari Lahir Pancasila'},
		];
		var newName = arrHolidayName.find((x) => x.key === holiday);
		if (newName) return newName.name
		return holiday;
	}
	$.createDTPicker = function(object, options){
		var body = $('body');
		var datetoday = new Date();
		var day = datetoday.getDate();
		var month = datetoday.getMonth() + 1;
		var year = datetoday.getFullYear();
		var todaydate = "";
		var calendarOptions = options.calendarOptions;
		var calendar = new Calendar(calendarOptions);
		var isfocus = 0;
		var arrdays = ["A", "S", "S", "R", "K", "J", "S"];
		var arrdaybgcolors = ["#D32F2F", "#455A64", "#455A64", "#455A64", "#455A64", "#388E3C", "#455A64"];
		var arrdaytextcolors = ["#FFCDD2", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#C8E6C9", "#FFFFFF"];
		var arrdatebgcolors = ["#FFCDD2", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#C8E6C9", "#FFFFFF"];
		var arrdatetextcolors = ["#D32F2F", "#222222", "#222222", "#222222", "#222222", "#388E3C", "#222222"];
		var arrmonthmasehi = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
		var arryearmasehi = [1901, 2100];
		var dailyrows = [];
		var dailycells = [];
		var monthSelect;
		var yearSelect;
		var nextMonthButton;
		var prevMonthButton;
		var closeButton;
		var todayButton;

		var dtpicker = {
			init: function(){
				var type = options.calendarType;
				if (todaydate === '') dtpicker.today();
				if (object.wrapper === undefined){
					var table = $('<div>')
						.addClass('table-monthview')
						.css({
							'display': 'table',
							'width': '100%',
							'border-collapse': 'separate',
							'border-spacing': '1px',
							'padding': '1px'
						});

					monthSelect =
						$('<select>')
							.addClass('month-select')
							.css({
								'width': '100%'
							})
							.attr({
								'id': 'month-select',
								'name': 'month-select'
							});

					yearSelect =
						$('<select>')
							.addClass('year-select')
							.css({
								'width': '100%'
							})
							.attr({
								'id': 'year-select',
								'name': 'year-select'
							});

					for (var m = 0; m < 12; m++){
						monthSelect.append(new Option(arrmonthmasehi[m], m + 1));
					}
					for (var y = arryearmasehi[0]; y <= arryearmasehi[1]; y++){
						yearSelect.append(new Option(y, y));
					}

					nextMonthButton = $('<button>')
						.addClass('button-month-next mybutton')
						.html("&#9658;");

					prevMonthButton = $('<button>')
						.addClass('button-month-prev mybutton')
						.html("&#9668;");

					closeButton = $('<button>')
						.addClass('button-close mybutton')
						.html("&#10006;");

					var todayCaption = "";

					if (todaydate !== ''){
						var arrdate = todaydate.split("-");
						if ((arrdate.length) > 2){
							var tday = parseInt(arrdate[2]);
							var tmonth = parseInt(arrdate[1]);
							var tyear = parseInt(arrdate[0]);
							var monthName = arrmonthmasehi[tmonth - 1];
							todayCaption = tday + " " + monthName + " " + tyear;
						}
					}

					todayButton = $('<button>')
						.addClass('button-close mybutton')
						.html("&#x2714; Hari ini: " + todayCaption);

					var row1 = $('<div>')
						.addClass('row-monthview')
						.css({
							'display': 'table-row',
							'padding': '1px'
						})
						.append(
							$('<div>')
								.addClass('cell-monthview')
								.css({
									'display': 'table-cell',
									'padding':'0px'
								})
								.append(
									$('<div>')
										.addClass('table-monthview')
										.css({
											'display': 'table',
											'width': '100%',
											'border-collapse': 'separate',
											'border-spacing': 0,
											'padding':0
										})
										.append(
											$('<div>')
												.addClass('row-monthview')
												.css({
													'display': 'table-row',
													'padding': '1px'
												})
												.append(
													$('<div>')
														.addClass('cell-monthview')
														.css({
															'display': 'table-cell',
															'padding':'2px',
															'width': '20px',
															'text-align' : 'center'
														})
														.append(prevMonthButton)
												)
												.append(
													$('<div>')
														.addClass('cell-month-select')
														.css({
															'display': 'table-cell',
															'padding':'2px',
															'max-width': '100px'
														})
														.append(monthSelect)
												)
												.append(
													$('<div>')
														.addClass('cell-year-select')
														.css({
															'display': 'table-cell',
															'padding':'2px',
															'max-width': '90px'
														})
														.append(yearSelect)
												)
												.append(
													$('<div>')
														.addClass('cell-monthview')
														.css({
															'display': 'table-cell',
															'padding':'2px',
															'width': '20px',
															'text-align' : 'center'
														})
														.append(nextMonthButton)
												)
											/*
                                            .append(
                                                $('<div>')
                                                .addClass('cell-monthview')
                                                .css({
                                                    'display': 'table-cell',
                                                    'padding':'2px',
                                                    'width': '20px',
                                                    'text-align' : 'center'
                                                })
                                                .append(closebutton)
                                            )
                                            */
										)
								)
						);

					table.append(row1);

					var dayrow = $('<div>')
						.addClass('row-monthview')
						.css({
							'display': 'table-row',
							'padding': '1px'
						});

					for (var d = 0; d < 7; d++){
						var cellday = $('<div>')
							.addClass('cell-monthview')
							.css({
								'display': 'table-cell',
								'width': '14.285%',
								'text-align': 'center',
								'font-weight': 'bold',
								'color': arrdaytextcolors[d],
								'background': arrdaybgcolors[d],
								'margin':'2px',
								'border-radius': '2px 2px 2px 2px',
								'-moz-border-radius': '2px 2px 2px 2px',
								'-webkit-border-radius': '2px 2px 2px 2px'
							})
							.text(arrdays[d])
						;
						dayrow.append(cellday);
					}

					var row2 = $('<div>')
						.addClass('row-monthview')
						.css({
							'display': 'table-row',
							'padding': '1px'
						})
						.append(
							$('<div>')
								.addClass('cell-monthview')
								.css({
									'display': 'table-cell',
									'padding':'0px',
									'width': '100%'
								})
								.append(
									$('<div>')
										.addClass('table-monthview')
										.css({
											'display': 'table',
											'width': '100%',
											'border-collapse': 'separate',
											'border-spacing': '1px'
										})
										.append(dayrow)
								)
						);

					table.append(row2);

					//============ DATA ==============//

					var dailytable = $('<div>')
						.addClass('table-monthview')
						.css({
							'display': 'table',
							'width': '100%',
							'border-collapse': 'separate',
							'border-spacing': '1px'
						});

					for (var w = 0; w < 7; w++){
						var weekrow = $('<div>')
							.addClass('row-daily row-daily-' + w)
							.css({
								'display': 'table-row',
								'padding': '1px',
							});

						for (var d = 0; d < 7; d++){
							var i = (w * 7) + d;

							var celldaily = $('<div>')
								.addClass('cell-daily')
								.css({
									'display': 'table-cell',
									'border':'1px solid #aaa',
									'width': '14.285%',
									'text-align': 'center',
									'font-weight': 'bold',
									'color': arrdatetextcolors[d],
									'background': arrdatebgcolors[d],
									'margin':'1px',
									'cursor': 'default',
									'border-radius': '2px 2px 2px 2px',
									'-moz-border-radius': '2px 2px 2px 2px',
									'-webkit-border-radius': '2px 2px 2px 2px'

								})
								.text("");

							dailycells[i] = celldaily;
							weekrow.append(celldaily);
						}

						dailyrows[w] = weekrow;
						dailytable.append(weekrow);
					}

					var row3 = $('<div>')
						.addClass('row-monthview')
						.css({
							'display': 'table-row',
							'padding': '1px'
						})
						.append(
							$('<div>')
								.addClass('cell-monthview')
								.css({
									'display': 'table-cell',
									'padding':'0px',
									'width': '100%'
								})
								.append(dailytable)
						);

					table.append(row3);

					//==========================INFO HOLIDAY====================//
					var holidaytable = $('<div>')
						.addClass('holiday-table')
						.css({
							'display': 'table',
							'width': '100%',
							'border-collapse': 'separate',
							'border-spacing': '1px',
							'padding':'1px'
						})
					;

					var row4 = $('<div>')
						.addClass('row-monthview')
						.css({
							'display': 'table-row',
							'padding': '1px'
						})
						.append(
							$('<div>')
								.addClass('cell-monthview')
								.css({
									'display': 'table-cell',
									'padding':'0px',
									'width': '100%'
								})
								.append(holidaytable)
						);

					table.append(row4);

					var row5 = $('<div>')
						.addClass('row-monthview')
						.css({
							'display': 'table-row',
							'padding': '1px'
						})
						.append(
							$('<div>')
								.addClass('cell-monthview')
								.css({
									'display': 'table-cell',
									'padding':'0px',
									'width': '100%',
									'text-align': 'center',
									'margin-top': '10px'
								})
								.append(todayButton)
							//.html("Hari ini: " + )
						);

					table.append(row5);

					var wrapper = $('<div>')
						.addClass('dtpicker-wrapper')
						.css({
							'position':'fixed',
							'z-index': 1000,
							'display': 'none',
							'padding': '4px',
							'width':'250px',
							'height':'auto',
							'border':'1px solid #aaa',
							'background':'#fff',
							'border-radius': '6px 6px 6px 6px',
							'-moz-border-radius': '6px 6px 6px 6px',
							'-webkit-border-radius': '6px 6px 6px 6px',
							'-webkit-box-shadow': '0px 0px 7px -1px rgba(71,70,71,1)',
							'-moz-box-shadow': '0px 0px 7px -1px rgba(71,70,71,1)',
							'box-shadow': '0px 0px 7px -1px rgba(71,70,71,1)'
						})
						.append(table);

					object.body.append(wrapper);
					object.wrapper = wrapper;

					monthSelect.val(month);
					yearSelect.val(year);

				}
			},
			get: function (){
				var type = options.calendarType;
				var data = calendar.KalenderMasehi(year, month);
				dtpicker.generate(data.data);
			},
			generate: function(data){
				var readonly = options.readonly;
				var Dates = data[0].dates;
				var WeeksCount = Dates.length / 7;
				var holidaytable = $(".holiday-table");

				holidaytable.empty();

				for (var a = WeeksCount; a < 7; a++){
					dailyrows[a].css({'display': 'none'});
				}

				for (var w = 0; w < WeeksCount; w++){
					dailyrows[w].css('display', 'table-row');
					for (var d = 0; d < 7; d++){
						var i = (w * 7) + d;
						var Daily = Dates[i];
						var DayType = Daily['type'];
						var MasehiDate = Daily['masehi'];
						var HijriDate = Daily['hijri'];
						var Holidays = Daily['holidays'];
						var SelectDate = MasehiDate;

						var ArrSelectDate = SelectDate.split('-');
						var ArrMasehiDate = MasehiDate.split('-');
						var ArrHijriDate = HijriDate.split('-');

						var SelectDay = parseInt(ArrSelectDate[2]);
						var SelectMonth = parseInt(ArrSelectDate[1]);
						var SelectYear = parseInt(ArrSelectDate[0]);
						var TextColor = arrdatetextcolors[d];
						var BgColor = arrdatebgcolors[d];

						dailycells[i].text(SelectDay);

						dailycells[i].removeClass("current");
						dailycells[i].removeClass("before");
						dailycells[i].removeClass("after");
						dailycells[i].removeClass("selday");

						/*
						if (day === SelectDay && month === SelectMonth && year === SelectYear) {
							dailycells[i].addClass("selday")
						}
						*/
						dailycells[i].addClass(DayType);
						if (DayType !== "current") { BgColor = "#DDDDDD";}

						var hollist = "";

						if (Holidays){
							TextColor = "#D32F2F";
							BgColor = "#FFCDD2";
							if (DayType === "current") {

								$.each(Holidays, function( key, value ) {
									var holidaySlug = Holidays[key].name;
									var holidayYear = Holidays[key].age ?? '';
									var holidayName = convertHolidayName(holidaySlug) ?? holidaySlug;

									hollist += holidayName + " " + holidayYear + ", ";
									var holidayText = holidayName + " " + holidayYear;

									holidaytable
										.append(
											$('<div>')
												.addClass('row-monthview')
												.css({
													'display': 'table-row',
													'padding': '1px'
												})
												.append(
													$('<div>')
														.addClass('cell-monthview')
														.css({
															'display': 'table-cell',
															'padding':'0px',
														})
														.text(SelectDay)
												)
												.append(
													$('<div>')
														.addClass('cell-monthview')
														.css({
															'display': 'table-cell',
															'padding-left':'2px'
														})
														.text(holidayText)
												)
										);

								});
							}
						}

						if (dailycells[i].hasClass("selday") && dailycells[i].hasClass("current")){
							BgColor = "#FFE0B2";
						}

						if (hollist.length > 2){
							hollist = hollist.slice(0, -2);
						}

						dailycells[i].attr("title", hollist);

						dailycells[i].css({
							'color': TextColor,
							'background': BgColor,
						});

						dailycells[i].attr({
							'oldbg': BgColor
						});

						$(".before").css({
							'font-size': '75%'
						});

						$(".after").css({
							'font-size': '75%'
						});

						$(".cell-over").css({
							'background': '#ddd'
						});

						dailycells[i].on({
							click: function(){
								var format = options.format;

								var daynum = parseInt($(this).text()) ;
								var monthnum = month;
								var yearnum = year;

								var value = dateValue(yearnum, monthnum, daynum, format);
								$(object).val(value);

								dtpicker.hide();
							}
						});
					}
				}

				$(object).prop( "readonly", readonly );
				isfocus = 1;
			},
			today: function(){
				var datetoday = new Date();
				var day = datetoday.getDate();
				var month = datetoday.getMonth() + 1;
				var year = datetoday.getFullYear();
				todaydate = (0, formatReadDate)(year, month, day);
			},
			ready: function(){
				var position = $(object).position();
				var height = $(object).height();

				object.wrapper.css({
					'top': position.top + height + 8,
					'left': position.left
				});

				$('.mybutton').css({
					'background': '#fff',
					'font-weight': 'bold',
					'border': 0,
					'border-radius': '2px 2px 2px 2px',
					'-moz-border-radius': '2px 2px 2px 2px',
					'-webkit-border-radius': '2px 2px 2px 2px'
				});

				monthSelect.prop('selectedIndex', month - 1);
				yearSelect.val(year);

				object.wrapper.fadeIn("slow");
			},
			show: function(){
				options.value = $(object).val();
				options.value = options.value.trim();

				var format = options.format;
				var value = options.value;

				if (value === ''){
					value = todaydate;
					if (value !== ''){
						var arrdate = value.split("-");
						if  ((arrdate.length) > 2){
							day = parseInt(arrdate[2]);
							month = parseInt(arrdate[1]);
							year = parseInt(arrdate[0]);
						}
						dtpicker.ready();
					}
				} else {
					//yyyy-mm-dd
					if (format.toLowerCase() == 'yyyy-mm-dd'){
						var arrdate = value.split("-");
						if  ((arrdate.length) > 2){
							day = parseInt(arrdate[2]);
							month = parseInt(arrdate[1]);
							year = parseInt(arrdate[0]);
						}
					} else if (format.toLowerCase() == 'dd-mm-yyyy'){
						var arrdate = value.split("-");
						if  ((arrdate.length) > 2){
							day = parseInt(arrdate[0]);
							month = parseInt(arrdate[1]);
							year = parseInt(arrdate[2]);
						}
					} else if (format.toLowerCase() == 'mm-dd-yyyy'){
						var arrdate = value.split("-");
						if  ((arrdate.length) > 2){
							day = parseInt(arrdate[1]);
							month = parseInt(arrdate[0]);
							year = parseInt(arrdate[2]);
						}
					} else if (format.toLowerCase() == 'yyyy/mm/dd'){
						var arrdate = value.split("/");
						if  ((arrdate.length) > 2){
							day = parseInt(arrdate[2]);
							month = parseInt(arrdate[1]);
							year = parseInt(arrdate[0]);
						}
					} else if (format.toLowerCase() == 'dd/mm/yyyy'){
						var arrdate = value.split("/");
						if  ((arrdate.length) > 2){
							day = parseInt(arrdate[0]);
							month = parseInt(arrdate[1]);
							year = parseInt(arrdate[2]);
						}
					} else if (format.toLowerCase() == 'mm/dd/yyyy'){
						var arrdate = value.split("-");
						if  ((arrdate.length) > 2){
							day = parseInt(arrdate[1]);
							month = parseInt(arrdate[0]);
							year = parseInt(arrdate[2]);
						}
					} else {
						var arrdate = value.split("-");
						if  ((arrdate.length) > 2){
							day = parseInt(arrdate[2]);
							month = parseInt(arrdate[1]);
							year = parseInt(arrdate[0]);
						}
					}
				}
				dtpicker.ready();

			},
			hide: function(){
				object.wrapper.fadeOut("fast");
				isfocus = 0;
			},
			event: function(){
				$(document).on({
					click: function(e){
						if($(e.target).closest(object.wrapper).length !== 0) return false;
						dtpicker.hide();
					}
				});
				$(object).on({
					click: function(e){
						e.stopPropagation();
						if (isfocus === 0){
							dtpicker.get();
							dtpicker.show();
						}
					},
					focus: function(e){
						e.stopPropagation();
						if (isfocus === 0){
							dtpicker.show();
						}
					},
					hover: function(e){
						if (isfocus === 1){
							dtpicker.hide();
						}
					}
				});
				monthSelect.on({
					change: function(){
						month = $(this).val();
						dtpicker.get();
					}
				});
				yearSelect.on({
					change: function(){
						year = $(this).val();
						dtpicker.get();
					}
				});
				nextMonthButton.on({
					click: function(){
						var nextmonth = parseInt(month) + 1;
						if (nextmonth > 12){
							nextmonth = 1;
							year += 1;
						}
						month = nextmonth;
						monthSelect.prop('selectedIndex', nextmonth - 1);
						yearSelect.val(year);
						dtpicker.get();
					}
				});
				prevMonthButton.on({
					click: function(){
						var prevmonth = parseInt(month) - 1;
						if (prevmonth < 1){
							prevmonth = 12;
							year -= 1;
						}
						month = prevmonth;
						monthSelect.prop('selectedIndex', prevmonth - 1);
						yearSelect.val(year);
						dtpicker.get();
					}
				});
				closeButton.on({
					click: function(){
						dtpicker.hide();
					}
				});
				todayButton.on({
					click: function(){
						var format = options.format;

						if (todaydate != ''){
							var arrdate = todaydate.split("-");
							if ((arrdate.length) > 2){
								var tday = parseInt(arrdate[2]);
								var tmonth = parseInt(arrdate[1]);
								var tyear = parseInt(arrdate[0]);

								var value = dateValue(tyear, tmonth, tday, format);
								$(object).val(value);
							}
						}

						dtpicker.hide();
					}
				});
				$('.cell-daily').on({
					mouseover: function(){
						$(this).css({
							'background': '#eee'
						});
					},
					mouseout: function(){
						var oldbg = $(this).attr("oldbg");
						$(this).css({
							'background': oldbg
						});
					},
				});
			}
		}

		object.options = options;
		object.body = body;
		object.dtpicker = dtpicker;

		dtpicker.today();
		dtpicker.init();
		dtpicker.event();

		return object;
	};
	$.fn.inochiDTPicker = function(options){
		var defaults =
			{
				format: 'yyyy-mm-dd',
				readonly: false,
				value: '',
				calendarOptions: null,
			};

		var settings = $.extend(true, {}, defaults, options);

		return this.each(function(){
			$.createDTPicker(this, settings);
		});
	};
})(jQuery);
