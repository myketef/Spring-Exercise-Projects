const memeForm = document.getElementById('memeForm');
const memeContainer = document.querySelector('.meme-container');

memeForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const topText = document.getElementById('topText').value;
      const bottomText = document.getElementById('bottomText').value;
      const imageLink = document.getElementById('imageLink').value;

      if (!topText || !bottomText || !imageLink) {
            alert('Please fill in all fields');
            return;
      }

      const meme = document.createElement('div');
      meme.classList.add('meme');

      const image = document.createElement('img');
      image.src = imageLink;

      const topTextDiv = document.createElement('div');
      topTextDiv.classList.add('top-text');
      topTextDiv.textContent = topText;

      const bottomTextDiv = document.createElement('div');
      bottomTextDiv.classList.add('bottom-text');
      bottomTextDiv.textContent = bottomText;

      const deleteBtn = document.createElement('button');
      deleteBtn.classList.add('delete-btn');
      deleteBtn.textContent = 'Delete';

      meme.appendChild(image);
      meme.appendChild(topTextDiv);
      meme.appendChild(bottomTextDiv);
      meme.appendChild(deleteBtn);

      meme.addEventListener('click', (event) => {
            if (event.target.classList.contains('delete-btn')) {
                  meme.remove();
            }
      });

      deleteBtn.addEventListener('click', () => {
            meme.remove();
      });

      memeContainer.appendChild(meme);
      memeForm.reset();
});
