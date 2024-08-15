interface DescriptionProps {
  overview: string;
  contentType: string;
}

export function Description({ overview, contentType }: DescriptionProps) {
  const message =
    contentType === "tv"
      ? "Essa série não tem descrição"
      : "Esse filme não tem descrição";

  return (
    <>
      <h3 className="font-semibold">Descrição</h3>
      <p className="text-sm text-muted-foreground">
        {overview.length === 0 ? message : overview}
      </p>
    </>
  );
}
