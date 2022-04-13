import React, {useState, useEffect} from 'react';

/*
* Here is an example component, the props (children, number, text) being used are
* destructured in this example but do not have to be. Note that javascript within
* the return statement is surrounded by {}.
*/

export default function Example({
  children,
  number,
  text
}) {
  const [newNumber, setNewNumber] = useState(0);

  let newText;
  if (text) {
    newText = text.toUpperCase();
  }

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    async function fetchData() {
      // Update the document title using the browser API
      const request = await fetch('/api/');
      const json = await request.json();
      console.log(json);
    }
    fetchData();
  });


  return (
        <div>
            <p>This is your new number: {}</p>
            <p>This is your new text: {newText}</p>
            {children}
        </div>
  );
}