

//FIND LOCATIOn


$.getJSON('https://freegeoip.net/json/?callback=?', function(data) {
  console.log(JSON.stringify(data, null, 2));{
      $('.ippub').text(data.ip)
      $('.country').text(data.city)

  }
});

