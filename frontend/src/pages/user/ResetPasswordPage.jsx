import React from "react";
import { useSearchParams } from "react-router-dom";
import ResetPasswordForm from "../../components/user/ResetPasswordForm";

function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  return <ResetPasswordForm token={token} />;
}

export default ResetPasswordPage;
