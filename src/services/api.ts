const GITHUB_API_URL = 'https://api.github.com';

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
      throw new Error(errorData.message || 'Error fetching data from GitHub');
    }

    const data = await response.json();
    return data.items;
  } catch (error) {
    console.error('Error fetching data from GitHub:', error);
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
      throw new Error(errorData.message || 'Error fetching repository forks');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching repository forks:', error);
    throw error;
  }
};
