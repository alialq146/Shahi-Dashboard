import SettingsView from "@/components/views/SettingsView";
import { getShopInfo, getUsers } from "@/lib/data";

export default async function SettingsPage() {
  const [shopInfo, users] = await Promise.all([getShopInfo(), getUsers()]);
  return <SettingsView shopInfo={shopInfo} users={users} />;
}
