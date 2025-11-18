import { AddTransactionButton } from "./components/AddTransactionButton";
import { AddTransactionSheet } from "./components/AddTransactionSheet";
import { BalanceCard } from "./components/BalanceCard";
import { HeaderCard } from "./components/HeaderCard";
import { TransactionChart } from "./components/TransactionChart";
import { TransactionList } from "./components/TransactionList";
import { AppLayout } from "./layout/AppLayout";

function App() {
  return (
    <AppLayout>
      <HeaderCard />
      <BalanceCard />
      <TransactionChart />
      <AddTransactionButton />
      <AddTransactionSheet />
      <TransactionList />
    </AppLayout>
  );
}

export default App;
