const submitButton = document.getElementById("tombol_create_shortlink")
submitButton.addEventListener("click", () => {
      var payload = {
            link_asli: $('#link_asli').val(),
            link_shorten: $('#link_shorten').val(),
      }

      var pesanError = {
            link_asli: 'Link asli belum diisi',
            link_shorten: 'Link shorten belum diisi',
      }

      var keys = Object.keys(payload)
      for (var i = 0; i < keys.length; i++) {
            if (payload[keys[i]] === '' || payload[keys[i]] === undefined) {
                  swal({
                        title: `${pesanError[keys[i]]}`,
                        icon: "error",
                  })
                  return false
            }
      }

      
      /**
       * Menhandle data pilihan waktu 
       * Merubah data pilihan waktu menjadi waktu_mulai dan waktu_berakhir
       * "08.00 - 10.00" => ["08.00", "10.00"]
       * Tahapan Pre Processing:
            * 1. built in method string => trim()
                  * "08.00 - 10.00" => trim() => "08.00-10.00"
            
            * 2. built in method string => split()
                  * "08.00-10.00" => split("-") => ["08.00", "10.00"]
       */

     

      /**
       * Menghandel data foto poster webinar
       */
      
      // data payload sudah siap di upload
      var myHeaders = new Headers()
      var raw = JSON.stringify(payload)
      myHeaders.append("Content-Type", "application/json");
      var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
      }

      $(submitButton).html(`<div class="spinner-border text-light" role="status"></div>`)

      // Fetch API 
      fetch(`${BASE_URL}/dashboard/shortlink/buat`, requestOptions)
            .then(response => response.json())
            .then(response => {
                  if (response.status_code == 200) {
                        swal({
                              title: `Berhasil Membuat Webinar Baru dengan Judul ${payload['nama']}`,
                              icon: "success",
                        }).then(value => {
                              window.location.reload()
                        })
                  }
                  else {
                        swal({
                              title: `${response.description[0]}`,
                              icon: "error",
                        })
                        $(submitButton).html(`Buat Webinar Baru`)
                  }
            })
            .catch(error => console.log('error', error))
})