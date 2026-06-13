
let data={};
let currentSheet='';

fetch('productos.json')
.then(r=>r.json())
.then(json=>{
data=json;
currentSheet=Object.keys(data)[0];
renderTabs();
renderProducts();
});

const tabs=document.getElementById('tabs');
const products=document.getElementById('products');
const search=document.getElementById('search');

function renderTabs(){
tabs.innerHTML='';
Object.keys(data).forEach(sheet=>{
const b=document.createElement('div');
b.className='tab'+(sheet===currentSheet?' active':'');
b.textContent=sheet;
b.onclick=()=>{currentSheet=sheet;renderTabs();renderProducts();};
tabs.appendChild(b);
});
}

function renderProducts() {
    const term = search.value.toLowerCase();
    products.innerHTML = '';

    (data[currentSheet] || [])
        .filter(p => {

            // Ignorar registros vacíos o con null
            if (
                p.descripcion == null ||
                p.descripcion === "null" ||
                p.precio == null ||
                p.precio === "null"
            ) {
                return false;
            }

            return p.descripcion.toLowerCase().includes(term);
        })
        .forEach(p => {

            // Quitar decimales del precio
            const precio = Number(p.precio) || 0;

            const c = document.createElement('div');
            c.className = 'card';

            c.innerHTML = `
                <h3>${p.descripcion}</h3>
                <p><b>Inventario:</b> ${p.inventario}</p>
                <p><b>Precio:</b> $${precio.toLocaleString('es-MX', {
                    maximumFractionDigits: 0
                })}</p>
            `;

            products.appendChild(c);
        });
}
search.addEventListener('input',renderProducts);
