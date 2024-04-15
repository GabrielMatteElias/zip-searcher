const btnSearch = document.querySelector('#submit')
const paragrafoErroResponse = document.querySelector('#erro-response')

function formatarCep() {

}

btnSearch.addEventListener('click', async function (e) {
    e.preventDefault();

    paragrafoErroResponse.textContent = ''
    
    const zipCode = document.querySelector('#zip')
    const zipValue = zipCode.value
    console.log(typeof zipValue, zipValue);
    const quantidadeCaracteres = zipValue.length;

    if (quantidadeCaracteres < 8) {
        paragrafoErroResponse.innerText = 'O CEP deve conter pelo menos 8 caracteres.'
        return
    }

    let zipCodeResponse = {}

    await fetch(`https://viacep.com.br/ws/${zipValue}/json`, {
        method: "GET",
        mode: "cors",
        headers: {
            'content-type': 'application/json;charset=utf-8',
        }
    })
        .then(res => res.json())
        .then(data => {
            zipCodeResponse = data
        })
        .catch(e => console.log(e))
    console.log(zipCodeResponse);

    if (zipCodeResponse && zipCodeResponse.erro === true) {
        paragrafoErroResponse.innerText = 'O CEP informado é inválido'
        return
    }
    const response = await fetch(`https://pixabay.com/api/?key=43401278-360ffe917755ed902bde80f5b&q=${zipCodeResponse.localidade}&image_type=photo`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        }
    })
    const data = await response.json()
    const linkImg = data.hits[0].largeImageURL

    const paragrafoZipResponse = document.querySelector('.zipcode-text-response')

    paragrafoZipResponse.innerText = `${zipCodeResponse.logradouro} - ${zipCodeResponse.bairro}. CEP: ${zipValue}. ${zipCodeResponse.localidade} - ${zipCodeResponse.uf}`
    document.body.style.backgroundImage = 'url(' + linkImg + ')';

})
