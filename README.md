# Peanut Take Home

Task: Create a UI for users to generate a payment link

## Getting Started
Install the dependencies:

```bash
npm install
# or
yarn 
# or
pnpm install
# or
bun install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Technologies
Nextjs
Tailwind
Viem

## Folder Structure
`src`: Contains all the source code for the project
`src/app`: Contains the main application routes
`src/components`: Contains all components used in the application
`src/lib`: Contains functions and constants used in the application
`src/lib/constants.ts`: Contains variables that remains the same throughout the application
`src/lib/utils`: Contains utility function 

## Ideas/How it works
1. The initial page shows a form where a user can enter the recipient address, chain, amount, and token.
2. Recipient address is verified using `isAddress` from viem or if it's an ENS we fetch the address also using viem
3. All other fields are optional and the user can create a link with or without them
4. The link generated is intended to be done using peanut `createRequestLink` function to create a request link for the user
5. The current generated link takes a users to the pay route where they see a pay button and the other fields get prefilled from the url
6. The payment button is intended to use viem to get the default provider and use peanut to fullfill the payment using the `fulfillRequestLink`
7. The `/pay` route validates the url and gets the required values, if the recepient is invalid, it disables the button and gives the user the options to enter a valid address or ENS in the input

## Considerations
- The initial design was to make the link creation static i.e the user does not need to click any buttons to generate the links. I personally find this experience easier to use and the user can learn how the create link works. This will help them create on their own

TradeOff: The downside of this approach is the user will have to call the `createRequestLink` function on every update on the form. This can be reduced by debouncing the amount and the address fields.


