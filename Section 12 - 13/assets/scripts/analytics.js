const timerId = setInterval(() => {
  console.log('Sending Analytics...');
}, 2000);

document.getElementById('stop-analytics-btn').addEventListener('click', () => {
  // NOTE: clearTimeout() would also clear an interval, but it makes more sense to just use clearInterval():
  clearInterval(timerId);
});
