export async function fetchContributionsGraphQL(username: string, token: string) {
  const query = `
    query {
      user(login: "${username}") {
        contributionsCollection {
          contributionCalendar {
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `;

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ query }),
  });

  const json = await res.json();
  const days = json.data.user.contributionsCollection.contributionCalendar.weeks
    .flatMap((week: any) => week.contributionDays)
    .map((day: any) => ({
      date: day.date,
      count: day.contributionCount,
    }));

  return days;
}
