'user strict'

window.onload = function(){

  const content1 = document.getElementById('guide__content__1');
  const content2 = document.getElementById('guide__content__2');
  const next = document.getElementById('next');

  content1.classList.remove('hidden');

  next.addEventListener('click', () => {
    content1.classList.add('hidden');
    content2.classList.remove('hidden');
  })
}