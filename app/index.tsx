import { Redirect } from "expo-router";
import React from "react";

export default function index() {
  return (
    // <Redirect href="/(auth)/Login"/>
     // <Redirect href="/(screen)/CredencialForm"/>
     <Redirect href="/(screen)/Dashboard" />
  );
}
