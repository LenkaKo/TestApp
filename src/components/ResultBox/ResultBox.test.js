import ResultBox from './ResultBox';
import { getByTestId, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';

describe('Component ResultBox', () => {
  it('Should render without crashing', () => {
    render(<ResultBox from="PLN" to="USD" amount={100}/>)
  });

  const testCasesPLN =  [
    {id: 'PLN 1.00 = $0.25', pln: 1},
    {id: 'PLN 5.00 = $1.25', pln: 5},
    {id: 'PLN 9.99 = $2.50', pln: 9.99},
    {id: 'PLN 20.00 = $5.00', pln: 20},
    {id: 'PLN 400.00 = $100.00', pln: 400}
  ];

  const testCasesUSD = [
    { id: '$0.25 = PLN 1.00', usd: 0.25 },
    { id: '$1.25 = PLN 5.00', usd: 1.25 },
    { id: '$2.50 = PLN 9.99', usd: 2.50 },
    { id: '$5.00 = PLN 20.00', usd: 5.00 },
    { id: '$100.00 = PLN 400.00', usd: 100.00 },
  ];

  const testCasesEqual = [
    { id: 100, result: 'PLN 100.00 = PLN 100.00'},
    { id: 1234, result: 'PLN 1,234.00 = PLN 1,234.00' },
    { id: 20, result: 'PLN 20.00 = PLN 20.00' },
    { id: 9.99, result: 'PLN 9.99 = PLN 9.99' },
    { id: 350, result: 'PLN 350.00 = PLN 350' }
  ];

  for (const caseObj  of testCasesEqual) {
    it('Should show the same amount', () => {
    render(<ResultBox from="PLN" to="PLN" amount={caseObj.id} />)
    const output = screen.getByTestId('mainDiv');
    expect(output).toHaveTextContent(caseObj.result);
   });
  };

  for (const caseObj of testCasesUSD) {
    it('Should render proper info about conversion when USD -> PLN', () => {
      render(<ResultBox from="USD" to="PLN" amount={caseObj.usd} />);
      const output = screen.getByTestId('mainDiv');
      expect(output).toHaveTextContent(caseObj.id);
    });
  };

  for (const caseObj of testCasesPLN) {
    it('Should render proper info about conversion when PLN -> USD', () => {
      render(<ResultBox from="PLN" to="USD" amount={caseObj.pln}/>);
      const output = screen.getByTestId('mainDiv');
      expect(output).toHaveTextContent(caseObj.id);
    });
  };

  it('Should return Wrong value...', () => {
    render(<ResultBox from="PLN" to="USD" amount={-100}/>)
    const output = screen.getByTestId('mainDiv');
    expect(output).toHaveTextContent('Wrong value.');
  });
});