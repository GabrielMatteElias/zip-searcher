const photosKey = 'LRbaKDHPoZ4UDhzbmTNZWrKH5zNqQXEk1PtAvX6jxjivM09hwj7kOx6z'
const btnSearch = document.querySelector('#submit')

btnSearch.addEventListener('click', async function (e) {
    e.preventDefault();


    const zipCode = document.querySelector('#zip')
    const zipValue = Number(zipCode.value)

    let zipCodeResponse = {}

    await fetch(`https://viacep.com.br/ws/${zipValue}/json/`)
        .then(res => res.json())
        .then(data => {
            zipCodeResponse = data
        })
        console.log(zipCodeResponse.localidade);

    // const response = await fetch(`https://api.pexels.com/v1/search?query=cidade ${zipValue}`, {
    //     method: 'GET',
    //     headers: {
    //         Accept: 'application/json',
    //         Authorization: photosKey
    //     }
    // })
    // const data = await response.json()
    // console.log(data);

    const paragrafoZipResponse = document.querySelector('.zipcode-text-response')
    paragrafoZipResponse.innerText = `${zipCodeResponse.logradouro} - ${zipCodeResponse.bairro}. CEP: ${zipValue}. ${zipCodeResponse.localidade} - ${zipCodeResponse.uf}`


    console.log(zipCodeResponse);
})
