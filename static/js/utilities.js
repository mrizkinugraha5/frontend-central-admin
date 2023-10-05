const getBase64FromUrl = async (url) => {
    const data = await fetch(url);
    const blob = await data.blob();
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
            const base64data = reader.result;
            resolve(base64data);
        }
    });
}

// rekursif give .
function dot(numstring) {
    if (numstring.length < 4) {
        return numstring;
    }
    else {
        return dot(numstring.slice(0, -3)) + "." + numstring.slice(-3);
    }
}

// fungsi merubah format harga
function rupiahFormat(x, only_number=false) {
    let rp = '' + x;   // buat jadi string
    if (rp.length > 3) {
        rp = dot(rp);
    }
    if(only_number) {
        return `${rp}`;
    }
    return `Rp. ${rp}`;
}

function search(option) {
    var elements = $(option.elementClassName)
    var threshold = 0.2
    var keyword = option.keyword

    if(keyword == "") {
        $(elements).each((index, element) => {
            $(element).removeClass("d-none")
        })
    }
    else {
        $(elements).each((index, element) => {
            var score = stringSimilarity.compareTwoStrings(
                keyword,
                String($(element).find(".keyword").prop("innerText")).toLowerCase()
            )

            // jika ditemukan keyword yang sama persis
            if(score == 1) {
                $(elements).each((index, el) => {
                    $(el).addClass("d-none")
                })
                $(element).removeClass("d-none")
                
            }

            // jika dibawah threshold hilangkan element dengan menambahkan class "d-none" == "display-none"
            else if (score <= threshold) {
                $(element).addClass("d-none")
            }
            else {
                $(element).removeClass("d-none")
            }
        })
    }
}

export { getBase64FromUrl, rupiahFormat, search }