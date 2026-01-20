import { librosProgramacion, categoriasPopulares, topics } from "./assets/data";

const $trendingArea = document.getElementById('trending-area');
const $btnTrendingAll = document.getElementById('btn-trending-all');
const $popularCategories = document.getElementById('popular-categories');
const $btnSearch = document.getElementById('btn-search');
const $inputSearch = document.getElementById('input-search-home');
const $btnLogin = document.getElementById('btn-login');
const $btnSignup = document.getElementById('btn-signup');
const $topicsArea = document.getElementById('topics-area');

const cardHTML = (book)=>`
      <div class="group flex flex-col bg-card-dark rounded-xl overflow-hidden border border-secondary/10 transition-all duration-150 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
        <div class="relative aspect-3/3 bg-secondary overflow-hidden">
          <img alt="Book cover mockup with abstract minimalist geometric design"
              class="w-full h-full object-cover transition-transform duration-150 group-hover:scale-105"
              data-alt="Book cover mockup with abstract minimalist geometric design"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsXDeht6p1kvDYzCvoBtCh6E1P2udMnHswPlMPsp1QosKYHvJ76-ENWJBOfzCiJ2beACFGjObmZO0rWIsGfETTb_0ENAAMn3zDQF_eLsQzhYG7XF9QB792Wo7ggC0FhYUlWGihfa2ME05A3Ey1LHBbYfEnj0pOrByt69CiZXnAiPiOz8yFMuAfPuKELmelgSrn8ojnxdjVR03wdlBLrLoc4fGwo6dlWDHR1FW58RZiZUUEhgqmAQCA_kaig0FT_ycJbAqbxTeSI5b1" />
        </div>
        <div class="p-4 flex flex-col flex-1 relative">
          <div class="text-xs font-semibold text-primary mb-1">${book.categoria}</div>
          <h3 data-id=${book.id}
            class="book-trending text-lg font-bold leading-tight mb-1 group-hover:text-primary transition-colors active-style">
            ${book.titulo}
          </h3>
          <p class="text-sm text-secondary mb-0">${book.autor}</p>
          <button class="btn-wishlist absolute m-4 bottom-0 right-0 w-8 h-8 flex items-center justify-center rounded-full bg-secondary/20 transition-colors active-style">
            <span class="fill-light size-4 pointer-events-none">
              <svg viewBox="-4 0 30 30"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g><g stroke="none" stroke-width="1"> <g transform="translate(-419.000000, -153.000000)"> <path d="M437,153 L423,153 C420.791,153 419,154.791 419,157 L419,179 C419,181.209 420.791,183 423,183 L430,176 L437,183 C439.209,183 441,181.209 441,179 L441,157 C441,154.791 439.209,153 437,153"> </path> </g> </g> </g></svg>
            </span>
          </button>
        </div>
      </div>
  `;

const chipHTML = (chip)=>`
    <a class="filter-a active-style" href="/search?text=${encodeURIComponent(chip)}">${chip}</a>
  `;

const topicHTML = (topic)=> `
  <a class="categories-a group" href="/search?text=${encodeURIComponent(topic.name)}">
    <span class="mb-3 stroke-secondary group-hover:stroke-primary transition-colors">
      ${topic.svg}
    </span>
    <span class="font-bold text-sm">${topic.name}</span>
  </a>
`

const renderData = (data, container, elementHTML)=>{
  container.innerHTML = '';
  data.forEach(item => {
    container.innerHTML += elementHTML(item);
  })
}

renderData(librosProgramacion.slice(0,4), $trendingArea, cardHTML);
renderData(categoriasPopulares, $popularCategories, chipHTML);
renderData(topics, $topicsArea, topicHTML)

$btnLogin?.addEventListener('click', ()=>{
  window.location.href = `/login?text=${encodeURIComponent('login')}`;
})
$btnSignup?.addEventListener('click', ()=>{
  window.location.href = `/login?text=${encodeURIComponent('signup')}`;
})

$btnSearch?.addEventListener('click', ()=>{
  const searchContent = $inputSearch.value.trim();
  if (searchContent) {
    window.location.href = `/search?text=${encodeURIComponent(searchContent)}`;
  }
  else {
    window.location.href = `/search`;;
  }
})
$inputSearch.addEventListener('keydown', event=>{
  if (event.key === 'Enter') $btnSearch.click();
})

$btnTrendingAll?.addEventListener('click', ()=>{
  renderData(librosProgramacion.slice(0,8), $trendingArea, cardHTML);
  $btnTrendingAll.style.display = 'none';
})

$trendingArea?.addEventListener('click', (event)=>{
  const trendElement = event.target;
  if (trendElement.classList.contains('book-trending')) {
    window.location.href = `/src/pages/book/book?text=${encodeURIComponent(trendElement.dataset.id)}`;
  }
  else if (trendElement.classList.contains('btn-wishlist')) {
    trendElement.classList.toggle('add-wishlist');
  }
})





