import { librosProgramacion } from "../../assets/data";

const $resultBooks = document.getElementById('result-books');
const $inputSearchHeader = document.getElementById('input-search-header')
const $btnSearchHeader = document.getElementById('btn-search-header')

const $inputSearchMobile = document.getElementById('input-search-mobile')
const $btnSearchMobile = document.getElementById('btn-search-mobile')

const $searchText = document.getElementById('search-text');
const $searchcount = document.getElementById('search-count');

const $btnCategories = document.getElementById('btn-categories');
const $searchCategoriesCtr = document.getElementById('search-categories-ctr')

// Busqueda del usuario
const params = new URLSearchParams(window.location.search);
let search = params.get("text");

const bookHTML = (book)=> `
  <div class="group flex flex-col bg-card-dark rounded-xl overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl">
    <div class="relative w-full aspect-16/10 overflow-hidden bg-secondary">
      <div class="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
        style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBSTg43wl1dNEEea-AHSnWUWmjJUuLLCaOYYnz4whkj-3PZEC6qcY7Stz5BgVJW_040i_0LKucahnKCqtmebuX7RHDaY_RaAr6HO0Y_7NMQhFTfXgKhMgiXpHgxEyJWBCoiof4IAbSjcsWLoTtSPCb4u6sqJFnRjr0Sz2NCuEUuC8UuFRczrk-guR0UB8fsketPxSElEsZtjySaBV1GSOUv0qOrIfy3M7dm-oSbBmbm2bpprCXID-YhYwJqlEma68RnY2ROMuAauLx7');">
      </div>
      <div class="absolute inset-0 bg-linear-to-t from-[#1A232C] to-transparent opacity-80"></div>
    </div>
    <div class="p-5 flex flex-col flex-1">
      <div class="flex justify-between items-start mb-1">
        <h3 class="font-bold text-lg leading-tight group-hover:text-primary transition-colors line-clamp-2">
          ${book.titulo}
        </h3>
      </div>
      <p class="text-secondary/90 text-sm mb-3">${book.autor}</p>
      <p class="text-light/80 text-sm line-clamp-3 mb-5 flex-1 leading-relaxed font-body">
        ${book.descripcion}
      </p>
      <div class="flex items-center gap-2 mb-4 flex-wrap">
        <span class="px-2 py-1 rounded bg-secondary/10 text-xs font-medium text-secondary border border-secondary/20">${book.lenguaje}</span>
        <span class="px-2 py-1 rounded bg-secondary/10 text-xs font-medium text-secondary border border-secondary/20">${book.categoria}</span>
      </div>
      <div class="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 dark:border-[#2A3441]">
        <button class="bg-secondary/20 px-2 rounded-md h-full active-style hover:bg-primary">
          <span class="fill-light">
            <svg width="16" height="16" viewBox="-4 0 30 30"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g><g stroke="none" stroke-width="1"> <g transform="translate(-419.000000, -153.000000)"> <path d="M437,153 L423,153 C420.791,153 419,154.791 419,157 L419,179 C419,181.209 420.791,183 423,183 L430,176 L437,183 C439.209,183 441,181.209 441,179 L441,157 C441,154.791 439.209,153 437,153"> </path> </g> </g> </g></svg>
          </span>
        </button>
        <a href="/book?text=${encodeURIComponent(book.id)}" class="bg-primary px-4 py-2 rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:bg-primary/90 transition-all active-style">View Details
        </a>
      </div>
    </div>
  </div>
`
const renderData = (data, container, elementHTML)=>{
  container.innerHTML = '';
  data.forEach(item => {
    container.innerHTML += elementHTML(item);
  })
}

const filtrarLibros = (libros, texto)=> {
  const campos = ["titulo", "autor", "categoria", "lenguaje", "descripcion"];
  return libros.filter(libro =>
    campos.some(campo =>
      libro[campo].toLowerCase().includes(texto)
    )
  );
}
const searchNewBooks = (wordToFind)=>{
  const busqueda = wordToFind? wordToFind.toLowerCase().trim(): '';
  $searchText.innerHTML = busqueda? `Search results for "${busqueda}"`: 'All books';
  const arrayResult = filtrarLibros(librosProgramacion, busqueda? busqueda: '');
  $searchcount.innerHTML = `${arrayResult.length} results found`
  renderData(arrayResult.slice(0,8), $resultBooks, bookHTML);

  console.log(search)
}
searchNewBooks(search);

// Desktop input
$inputSearchHeader.addEventListener('keydown', event=>{
  if (event.key === 'Enter') {
    $btnSearchHeader.click();
  }
})
$btnSearchHeader.addEventListener('click', ()=>{
  search = $inputSearchHeader.value;
  searchNewBooks(search)
})
//Mobile input
$inputSearchMobile.addEventListener('keydown', event=>{
  if (event.key === 'Enter') {
    $btnSearchMobile.click();
  }
})
$btnSearchMobile.addEventListener('click', ()=>{
  search = $inputSearchMobile.value;
  searchNewBooks(search)
})

// left aside
$btnCategories.addEventListener('click', ()=>{
  $searchCategoriesCtr.classList.toggle('hidden');
  $btnCategories.classList.toggle('active-categories');
})