import React from "react";
import { parseAIResponse } from "./AIResponseFormatter";

export function SimpleTest() {
  const testText = "Leverage **useEffect** to perform side effects like data fetching in functional components.";

  return (
    <div className="p-4 bg-card rounded-lg border border-border">
      <h3 className="text-lg font-semibold mb-4">Formatting Test</h3>
      
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-2">Raw Text:</h4>
          <p className="text-sm bg-muted p-2 rounded">{testText}</p>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-2">Formatted Output:</h4>
          <div className="bg-muted/30 p-2 rounded">
            {parseAIResponse(testText)}
          </div>
        </div>
      </div>
    </div>
  );
} 