const submitButton = document.getElementById("tombol_buat_webinar")
submitButton.addEventListener("click", () => {
      var payload = {
            nama: $('#nama').val(),
            nama_pemateri: $('#nama_pemateri').val(),
            nama_pemateri_2: $('#nama_pemateri_2').val(),
            tanggal: $('#tanggal').val(),
            pilihan_waktu: $('#pilihan_waktu').val(),
            link_conference: $('#link_conference').val(),
            deskripsi: $('#deskripsi').val(),
            email: $('#email').val(),
            email_2: $('#email_2').val(),
            jenis: $('#jenis').val(),
            contact_whatsapp: $('#contact_whatsapp').val()
      }

      var pesanError = {
            nama: 'Judul Webinar belum diisi',
            nama_pemateri: 'Nama Pemateri Webinar belum diisi',
            tanggal: 'Tanggal Webinar belum diisi',
            pilihan_waktu: 'Pilihan Waktu Webinar belum ditentukan',
            link_conference: 'Link Conference Webinar belum diisi',
            deskripsi: 'Deskripsi Webinar belum disi',
            email: 'Email belum diisi'
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

      // Cek apakah ada Password
      if ($("#password").val() != "")  {
            payload["password"] = $("#password").val()
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

      // Preprocessing
      var pilihan_waktu = payload["pilihan_waktu"]
      pilihan_waktu = String(pilihan_waktu).split("-")
      var waktu_mulai = pilihan_waktu[0]
      var waktu_berakhir = pilihan_waktu[1]
      waktu_mulai = String(waktu_mulai).trim()
      waktu_berakhir = String(waktu_berakhir).trim()

      // Mendaftarkan variabel waktu_mulai dan waktu_berkakhir ke dalam variabel payload
      payload["waktu_mulai"] = waktu_mulai.replace('.', ':')
      payload["waktu_berakhir"] = waktu_berakhir.replace('.', ':')
      console.log(payload['waktu_mulai'])

      /**
       * Menghandel data foto poster webinar
       */
      var adaGambarBaru = localStorage.getItem("adaGambarBaru")
      if (adaGambarBaru == "0") {
            swal({
                  title: 'Kamu belum mengupload gambar poster webinar',
                  icon: 'error'
            })
            return false
      }
      payload['poster'] = localStorage.getItem('fileInputBase64')
      console.log(payload)
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
      fetch(`${BASE_URL}/dashboard/event/buat`, requestOptions)
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