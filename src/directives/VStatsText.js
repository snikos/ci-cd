export default {
  mounted(el) {
    let ph = el.textContent;
    if ( ph.length <= 1 ) return;
    let phrases = ph.split('.').slice(0, -1);
    let words = phrases.reduce((acc, el) => {
      let lel = el.replace(/[,.—:!?-_(){}[]]*/g, '').trim();
      lel = lel.replace(/[ _]+/g, ' ').trim();
      return acc + lel.split(' ').length;
    }, 0);
    let letters = phrases.reduce((acc, el) => {
      let xel = el.replace(/[^\w]*/g, '').trim();
      return acc + xel.length;
    }, 0);
    console.log('Article:', ph);
    console.log('Phrases:', phrases.length);
    console.log('Words:', words);
    console.log('Letters:', letters);
  },
  name: 'statsText'
}