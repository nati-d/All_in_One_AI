import React from "react";
import { parseAIResponse } from "./AIResponseFormatter";

export function FormattingDemo() {
  const sampleAIResponse = `# React Hooks Guide

Here's an example of how AI responses are formatted with your system's UI:

## Common React Hooks

Use **useEffect** to perform side effects in functional components, such as data fetching.

You can also use \`useState\` for managing component state and \`useContext\` for sharing data.

### Code Examples

Here's how to use useEffect:

\`\`\`javascript
import React, { useEffect, useState } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(\`/api/users/\${userId}\`);
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}
\`\`\`

### TypeScript Example

\`\`\`typescript
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

const useUser = (userId: string) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user data
  }, [userId]);

  return { user, loading };
};
\`\`\`

### Key Points

1. **useEffect** runs after every render by default
2. *Dependency array* controls when the effect runs
3. Use \`useCallback\` to memoize functions
4. Clean up side effects in the return function

#### Best Practices

• Always include dependencies in the dependency array
• Use \`useRef\` for values that don't trigger re-renders
• Clean up subscriptions and timers in useEffect cleanup`;

  return (
    <div className="p-6 bg-card rounded-lg border border-border">
      <h3 className="text-lg font-semibold mb-4">AI Response Formatting Demo</h3>
      <div className="bg-muted/30 p-4 rounded-lg">
        {parseAIResponse(sampleAIResponse)}
      </div>
    </div>
  );
} 