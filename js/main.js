window.addEventListener('load', init); 

// Global variables

const level = {
    mudah: 12,
    sedang: 9,
    susah: 5
};

const levelSaatIni = level.mudah;


let waktu = levelSaatIni;
let score = 0;
let isPlaying;


// Dom Elements
const kataInput = document.querySelector('#input-kata');
const kataSekarang = document.querySelector('#kata-sekarang');
const tampilScore = document.querySelector('#score');
const tampilWaktu = document.querySelector('#waktu');
const pesan = document.querySelector('#pesan');
const detik = document.querySelector('#detik');
const scoreTertinggi =  document.querySelector('#score-tertinggi');

const kata = [
        "pembicaraan",
         "dialog",
         "ventilasi",
         "publik",
         "perdebatan",
         "diskusi",
         "panel",
         "kelompok",
         "diskusi",
         "argumen",
         "pertimbangan",
         "pertemuan",
         "perundingan",
         "ikut",
         "menandatangani",
         "pembebasan", 
         "bersyarat",
         "kata sandi",
         "semboyan",
         "menyusun",
         "merumuskan",
         "sofa",
         "bertanya",
         "memformulasikan",
         "bingkai",
         "taruh",
         "pemeran",
         "pola",
         "kecantikan",
         "keajaiban",
         "cantik",
         "pembuka",
         "jalan",
         "sampel",
         "pengecualian",
         "intisari",
         "presiden"
];

// Inisialisasi
function init() {
    // tampilkan detik
    detik.innerHTML = levelSaatIni;
    // load kata di variabel kata dalam array
    showKata(kata);
    // start match kata input
    kataInput.addEventListener('input', startMatch);
    // hitung mundur setiap detik
    setInterval(waktuMundur, 1000);
    // cek status game
    setInterval(checkStatus, 50);
}

// score tertinggi dari local storage


// start match
function startMatch() {
    if (hitungKata()) {
        isPlaying = true;
        waktu = levelSaatIni + 1;
        showKata(kata);
        kataInput.value = '';
        score++;
    }

    // score tertinggi dari local storage
    if(typeof sessionStorage['scoreTertinggi'] === 'undifined' || score > sessionStorage['scoreTertinggi']) {
        sessionStorage['scoreTertinggi'] = score;
    } else {
        sessionStorage['scoreTertinggi'] = sessionStorage['scoreTertinggi'];
    }

    // cegah tampilan score tertinggi: -1
    if(sessionStorage['scoreTertinggi'] >= 0) {
        scoreTertinggi.innerHTML = sessionStorage['scoreTertinggi'];
    }

    // jika score -1, tampilkan 0
    if(score === -1) {
        tampilScore.innerHTML = 0;
    } else {
        tampilScore.innerHTML = score;
    }
}

// hitung waktu saat ini untuk katainput
function hitungKata() {
        if(kataInput.value === kataSekarang.innerHTML) {
            pesan.innerHTML = 'Benar!';
            return true;
        } else {
            pesan.innerHTML = '';   
            return false;
    }
}



// Pilih dan tampilkan kata acak
function showKata(kata) {
    // hasilkan kata acak
    const randomIndex = Math.floor(Math.random() * kata.length);
    // tampilankan kata acak
    kataSekarang.innerHTML = kata[randomIndex];
}

// waktu mundur
function waktuMundur() {
    if (waktu > 0) {
        waktu--;
    } else if (waktu === 0) {
        isPlaying = false;
    }
    // tampilkan waktu
    tampilWaktu.innerHTML = waktu;
}

// cek game status
function checkStatus() {
    if (!isPlaying && waktu === 0) {
        // tampilkan pesan
        pesan.innerHTML = 'Game Over!';
        score = -1;
    }
}