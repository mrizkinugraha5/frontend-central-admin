import { search } from "../../../utilities.js"
const searchInput = document.getElementById("search-input")
searchInput.addEventListener("keyup", () => {
    search({
        keyword: $(searchInput).val(),
        elementClassName: ".table-row"
    })
})

/**
 * Toogle Status Button
 * Publish and Unpublish Event Controller in platform
 */
 $(".toggle-status-button").click(function (e) {
    e.preventDefault()
    let kode_event = $(this).attr("data-kode-event")
    let judul_event = $(this).attr("data-judul-event")
    let action = $(this).attr("data-action")
    let email_narasumber = $(this).attr("data-email-narasumber")
    if(email_narasumber == "") {
        email_narasumber = undefined
    }
    swal({
        title: `Apakah kamu yakin ingin ${action} event dengan judul ${judul_event} ?`,
        icon: 'warning',
        buttons: {
            kembali: {
                className: "btn bg-gradient-info",
                text: "Kembali",
                value: 0
            },
            lanjut: {
                className: "btn bg-gradient-danger",
                text: "Iya",
                value: 1
            }
        }
    }).then((lanjut) => {
        if (lanjut) {
            var myHeaders = new Headers()
            myHeaders.append("Content-Type", "application/json");
            var requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                redirect: 'follow'
            }
            fetch(`${BASE_URL}/dashboard/event/${action}/${kode_event}`, requestOptions)
                .then(response => response.json())
                .then(response => {
                    if (response.status_code == 200) {
                        swal({
                            title: `Berhasil ${action} event dengan judul ${judul_event}`,
                            icon: 'success'
                        }).then(() => {
                            window.location.reload()
                        })
                    }
                })
        }
    })
})