const GITHUB_API_URL = 'https://api.github.com';

const DEFAULT_ERROR = 'Error fetching data from GitHub';

export const searchGithub = async (
  query: string = '',
  type: 'users' | 'repositories',
  page: number = 1
) => {
  try {
    const response = await fetch(
      `${GITHUB_API_URL}/search/${type}?q=${query}&page=${page}&per_page=12`
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || DEFAULT_ERROR);
    }

    const data = await response.json();
    return data.items;
  } catch (error) {
    console.error(DEFAULT_ERROR, error);
    throw error;
  }
};

export const getRepoForks = async (owner: string, repo: string) => {
  try {
    const response = await fetch(
      `${GITHUB_API_URL}/repos/${owner}/${repo}/forks?per_page=3`
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || DEFAULT_ERROR);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(DEFAULT_ERROR, error);
    throw error;
  }
};
