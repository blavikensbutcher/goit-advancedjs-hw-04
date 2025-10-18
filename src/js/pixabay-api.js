import axios from 'axios';

export async function getImages(input, page = 1, per_page) {
  const options = {
    key: '41061573-024b7cbeabeac3d17174d6333',
    q: String(input),
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: page,
    per_page: per_page || '20',
  };

  const params = new URLSearchParams(options);

  const res = await axios.get(`https://pixabay.com/api/?${params}`);

  return res.data;
}
