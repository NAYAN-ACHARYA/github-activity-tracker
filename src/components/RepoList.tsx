import { useEffect, useState } from "react";

type Repo = {
  id: number;
  name: string;
  html_url: string;
  description: string;
};

function RepoList({ username }: { username: string }) {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.github.com/users/${username}/repos`)
      .then((res) => res.json())
      .then((data) => setRepos(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [username]);

  if (loading) return <p className="text-center text-gray-700">Loading...</p>;
  if (!repos.length)
    return <p className="text-center text-gray-700">No repositories found.</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Repositories</h2>
      <ul className="space-y-4">
        {repos.map((repo) => (
          <li key={repo.id} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-medium text-indigo-600 hover:underline"
            >
              {repo.name}
            </a>
            <p className="text-sm text-gray-600 mt-1">
              {repo.description || "No description"}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RepoList;
