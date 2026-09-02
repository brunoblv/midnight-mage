import { PrismaClient, PostKind, Section } from "@prisma/client";

const prisma = new PrismaClient();

type Block =
  | { type: "p"; text: string }
  | { type: "image"; label: string }
  | { type: "quote"; text: string };

function blocks(items: Block[]) {
  return JSON.stringify(items);
}

async function main() {
  await prisma.faq.deleteMany();
  await prisma.guideProduct.deleteMany();
  await prisma.postProduct.deleteMany();
  await prisma.guide.deleteMany();
  await prisma.post.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.category.deleteMany();
  await prisma.product.deleteMany();
  await prisma.productCategory.deleteMany();
  await prisma.sitePage.deleteMany();

  const jornada = await prisma.category.create({
    data: {
      slug: "jornada",
      name: "Minha Jornada",
      eyebrow: "MINHA JORNADA",
      description:
        "Relatos e experiências pessoais desta jornada de autoconhecimento.",
      section: Section.JORNADA,
      order: 1,
      tags: {
        create: [
          { slug: "experiencias", name: "Experiências" },
          { slug: "reflexoes", name: "Reflexões" },
          { slug: "diario", name: "Diário" },
          { slug: "aprendizados", name: "Aprendizados" },
        ],
      },
    },
    include: { tags: true },
  });

  const espiritualidade = await prisma.category.create({
    data: {
      slug: "espiritualidade",
      name: "Espiritualidade",
      eyebrow: "ESPIRITUALIDADE",
      description:
        "Conteúdos temáticos sobre autoconhecimento, tradições e simbolismo.",
      section: Section.ESPIRITUALIDADE,
      order: 2,
      tags: {
        create: [
          { slug: "autoconhecimento", name: "Autoconhecimento" },
          { slug: "consciencia", name: "Consciência" },
          { slug: "orixas", name: "Orixás" },
          { slug: "umbanda", name: "Umbanda" },
          { slug: "tarot", name: "Tarot" },
          { slug: "hermetismo", name: "Hermetismo" },
          { slug: "meditacao", name: "Meditação" },
          { slug: "ego", name: "Ego" },
          { slug: "simbolismo", name: "Simbolismo" },
        ],
      },
    },
    include: { tags: true },
  });

  const guias = await prisma.category.create({
    data: {
      slug: "guias",
      name: "Guias",
      eyebrow: "GUIAS",
      description:
        "Conteúdo com recomendações, comparações e sugestões práticas.",
      section: Section.GUIAS,
      order: 3,
      tags: {
        create: [
          { slug: "guia-tarot", name: "Tarot" },
          { slug: "guia-espiritualidade", name: "Espiritualidade" },
          { slug: "guia-ambiente", name: "Ambiente" },
        ],
      },
    },
    include: { tags: true },
  });

  const tag = (category: { tags: { slug: string; id: string }[] }, slug: string) => {
    const found = category.tags.find((t) => t.slug === slug);
    if (!found) throw new Error(`Tag não encontrada: ${slug}`);
    return found.id;
  };

  const productCats = await Promise.all([
    prisma.productCategory.create({
      data: { slug: "tarot", name: "Tarot", order: 1 },
    }),
    prisma.productCategory.create({
      data: { slug: "livros", name: "Livros", order: 2 },
    }),
    prisma.productCategory.create({
      data: { slug: "ambiente", name: "Ambiente", order: 3 },
    }),
    prisma.productCategory.create({
      data: { slug: "meditacao", name: "Meditação", order: 4 },
    }),
  ]);

  const catBySlug = Object.fromEntries(productCats.map((c) => [c.slug, c.id]));

  const products = await Promise.all([
    prisma.product.create({
      data: {
        slug: "rider-waite",
        name: "Tarot Rider-Waite",
        description:
          "O baralho clássico para quem está começando a ler as cartas como espelho.",
        priceCents: 8990,
        store: "Livraria Esotérica",
        affiliateUrl: "https://example.com/rider-waite",
        featured: true,
        categoryId: catBySlug.tarot,
      },
    }),
    prisma.product.create({
      data: {
        slug: "caibalion",
        name: "O Caibalion",
        description:
          "Os sete princípios herméticos em linguagem direta, para estudar com calma.",
        priceCents: 5490,
        store: "Editora Mística",
        affiliateUrl: "https://example.com/caibalion",
        featured: true,
        categoryId: catBySlug.livros,
      },
    }),
    prisma.product.create({
      data: {
        slug: "incenso-copal",
        name: "Incenso de copal",
        description: "Resina para limpar o ambiente antes da prática ou do terreiro.",
        priceCents: 3990,
        store: "Casa de Axé",
        affiliateUrl: "https://example.com/copal",
        featured: true,
        categoryId: catBySlug.ambiente,
      },
    }),
    prisma.product.create({
      data: {
        slug: "almofada-meditacao",
        name: "Almofada de meditação",
        description: "Apoio firme para sentar sem pressa e sem forçar a coluna.",
        priceCents: 12990,
        store: "Ateliê do Silêncio",
        affiliateUrl: "https://example.com/almofada",
        featured: true,
        categoryId: catBySlug.meditacao,
      },
    }),
    prisma.product.create({
      data: {
        slug: "tarot-marselha",
        name: "Tarot de Marselha",
        description:
          "Linha e cor cruas. Um baralho para quem quer menos ilustração e mais símbolo.",
        priceCents: 7490,
        store: "Livraria Esotérica",
        affiliateUrl: "https://example.com/marselha",
        featured: false,
        categoryId: catBySlug.tarot,
      },
    }),
    prisma.product.create({
      data: {
        slug: "kybalion-anotado",
        name: "Hermetismo prático",
        description:
          "Notas de estudo para cruzar o Caibalion com a vida cotidiana, sem jargão vazio.",
        priceCents: 6290,
        store: "Editora Mística",
        affiliateUrl: "https://example.com/hermetismo",
        featured: false,
        categoryId: catBySlug.livros,
      },
    }),
  ]);

  const product = (slug: string) => {
    const found = products.find((p) => p.slug === slug);
    if (!found) throw new Error(`Produto não encontrado: ${slug}`);
    return found;
  };

  const jornadaPosts = [
    {
      slug: "primeiro-silencio-da-meia-noite",
      title: "O primeiro silêncio da meia-noite",
      excerpt: "A noite em que a persona cansou e algo mais antigo pediu passagem.",
      subtitle:
        "Não foi uma revelação cinematográfica. Foi um intervalo. Um espaço entre o nome que eu repetia e o que restava quando ele calava.",
      quote: "O silêncio não chegou para me salvar. Chegou para me mostrar quem falava no meu lugar.",
      tagSlug: "experiencias",
      homeSlot: "jornada",
      publishedAt: new Date("2026-01-12"),
      content: blocks([
        {
          type: "p",
          text: "Eu tinha um roteiro para mim mesmo: o que dizer, o que parecer, o que defender. Funcionava durante o dia. À meia-noite, o roteiro falhava. Não por drama — por cansaço. A voz que eu chamava de eu simplesmente não aguentava mais o expediente.",
        },
        { type: "image", label: "A MESA À MEIA-NOITE" },
        {
          type: "p",
          text: "Foi ali que a jornada começou, sem iniciação formal. Um copo d'água, a casa quieta, e a pergunta que ninguém tinha me ensinado a fazer: se eu não for essa versão, o que sobra?",
        },
        {
          type: "quote",
          text: "O silêncio não chegou para me salvar. Chegou para me mostrar quem falava no meu lugar.",
        },
        {
          type: "p",
          text: "Este blog existe porque essa pergunta não se resolve numa noite. Ela pede caminho, ferramenta e testemunho. O que escrevo daqui em diante é o rastro disso.",
        },
      ]),
    },
    {
      slug: "diario-de-um-ego-em-dissolucao",
      title: "Diário de um ego em dissolução",
      excerpt: "Notas cruas sobre o dia em que a defesa virou peso.",
      subtitle:
        "Não tentei destruir o ego. Tentei ouvi-lo até ele confessar que estava cansado de proteger uma versão desatualizada de mim.",
      tagSlug: "diario",
      homeSlot: "jornada",
      publishedAt: new Date("2026-02-03"),
      content: blocks([
        {
          type: "p",
          text: "O ego não é vilão. É um funcionário antigo, contratado num momento de medo, que nunca recebeu aviso de férias. Ele organiza, compara, antecipa o ataque. Útil. Até o dia em que a utilidade vira cárcere.",
        },
        { type: "image", label: "PÁGINA DO CADERNO" },
        {
          type: "p",
          text: "Escrevi três páginas sem me corrigir. O texto saiu feio e verdadeiro. Pela primeira vez, não editei a ferida para parecer sabedoria.",
        },
        {
          type: "quote",
          text: "Dissolver não é desaparecer. É deixar de confundir o colete com a pele.",
        },
        {
          type: "p",
          text: "Ainda uso o ego. Só que agora sei quando ele está no expediente — e quando está noites a fio, inventando inimigos.",
        },
      ]),
    },
    {
      slug: "o-que-sobra-quando-o-nome-cai",
      title: "O que sobra quando o nome cai",
      excerpt: "Reflexão sobre identidade, persona e o resto que não cabe no cartão de visitas.",
      subtitle:
        "Meu nome funcionava bem em formulários. Funcionava mal quando eu precisava saber quem atravessava a madrugada comigo.",
      tagSlug: "reflexoes",
      homeSlot: "reflexao",
      publishedAt: new Date("2026-02-18"),
      content: blocks([
        {
          type: "p",
          text: "Nome é atalho. Serve para o outro te chamar. O problema começa quando o atalho vira destino: você passa a cumprir o que o nome promete, e esquece o que o corpo sabe.",
        },
        { type: "image", label: "SOMBRA NA PAREDE" },
        {
          type: "p",
          text: "Deixar o nome cair, mesmo que por alguns minutos, não é apagar a biografia. É notar a diferença entre história e essência.",
        },
        {
          type: "quote",
          text: "Todo dia é dia de deixar de ser quem se pensa.",
        },
        {
          type: "p",
          text: "O que sobra não precisa de slogan. Precisa de presença. O resto — papéis, cargos, feridas bem ensaiadas — pode esperar do lado de fora.",
        },
      ]),
    },
    {
      slug: "o-que-a-umbanda-me-ensinou-sobre-servico",
      title: "O que a Umbanda me ensinou sobre serviço",
      excerpt: "Aprendizado de terreiro: axé não é pose. É mão na obra e coração no outro.",
      subtitle:
        "Cheguei procurando respostas para mim. Fiquei porque o trabalho pedia que eu olhasse para fora.",
      tagSlug: "aprendizados",
      homeSlot: "jornada",
      publishedAt: new Date("2026-03-02"),
      content: blocks([
        {
          type: "p",
          text: "A Umbanda me recebeu sem me pedir um currículo espiritual. Pediu presença, respeito e disposição para servir. O resto — teoria, simpatia, estética — veio depois, se viesse.",
        },
        { type: "image", label: "CONGA ACESA" },
        {
          type: "p",
          text: "Serviço, ali, não é metáfora. É varrer, cantar, segurar a corrente, ouvir quem chega partido. O ego quer iluminação. O terreiro quer alguém que segure o ponto.",
        },
        {
          type: "quote",
          text: "Axé não é o que você declara. É o que circula quando você sai do centro.",
        },
        {
          type: "p",
          text: "Ainda estudo. Ainda erro. Mas o aprendizado que ficou: autoconhecimento que não desemboca em cuidado com o outro é só um espelho mais sofisticado.",
        },
      ]),
    },
    {
      slug: "a-noite-em-que-deixei-de-me-defender",
      title: "A noite em que deixei de me defender",
      excerpt: "Uma conversa interna que durou horas e terminou em trégua.",
      subtitle:
        "Eu ganhava todas as discussões imaginárias. Perdia o sono, a paz e a chance de ouvir o que a defesa escondia.",
      tagSlug: "reflexoes",
      homeSlot: "reflexao",
      publishedAt: new Date("2026-03-20"),
      content: blocks([
        {
          type: "p",
          text: "Há um tribunal que abre à noite, sem juiz. Só advogado de acusação e réu. Eu ocupava as duas cadeiras. Cansativo, e ineficiente: nenhuma sentença mudava o dia seguinte.",
        },
        { type: "image", label: "JANELA ABERTA" },
        {
          type: "p",
          text: "Deixar de me defender não foi me entregar. Foi notar que a maioria dos ataques era eco. Ninguém estava na sala. Eu é que mantinha o processo em pauta.",
        },
        {
          type: "quote",
          text: "A trégua não pede que você tenha razão. Pede que você desça da tribuna.",
        },
        {
          type: "p",
          text: "No dia seguinte, ainda reagi. Menos. Isso já foi jornada o bastante para anotar aqui.",
        },
      ]),
    },
    {
      slug: "caminhar-sem-mapa",
      title: "Caminhar sem mapa",
      excerpt: "Sobre avançar quando o método prometido não cabe na sua vida.",
      subtitle:
        "Procurei o manual certo por anos. O que funcionou foi andar mesmo sem garantia de que a trilha existia.",
      tagSlug: "experiencias",
      homeSlot: "reflexao",
      publishedAt: new Date("2026-04-08"),
      content: blocks([
        {
          type: "p",
          text: "Mapas são úteis até o momento em que se tornam desculpa para não sair de casa. Eu colecionava sistemas: um para meditar, outro para o tarot, outro para a fé. Cada um pedia fidelidade exclusiva.",
        },
        { type: "image", label: "TRILHA À NOITE" },
        {
          type: "p",
          text: "Caminhar sem mapa, para mim, foi recusar o guru e recusar também o cinismo. Ficar no meio: praticar, anotar, corrigir a rota no chão, não no PowerPoint.",
        },
        {
          type: "quote",
          text: "O caminho aparece para quem pisa. Não para quem espera o itinerário perfeito.",
        },
        {
          type: "p",
          text: "Se você está lendo isto à procura de um método único, não o tenho. Tenho um testemunho. Use o que servir. Descarte o resto.",
        },
      ]),
    },
  ];

  for (const post of jornadaPosts) {
    await prisma.post.create({
      data: {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        subtitle: post.subtitle,
        quote: "quote" in post ? post.quote : undefined,
        content: post.content,
        publishedAt: post.publishedAt,
        readingTime: 6,
        kind: PostKind.ARTICLE,
        homeSlot: post.homeSlot,
        categoryId: jornada.id,
        tagId: tag(jornada, post.tagSlug),
      },
    });
  }

  const spiritPosts = [
    {
      slug: "tarot-como-espelho",
      title: "Tarot como espelho, não como oráculo",
      excerpt: "As cartas não prevêem o futuro. Elas organizam o que você já sabe e finge não ver.",
      subtitle:
        "Deixei de perguntar o que vai acontecer. Passei a perguntar o que está acontecendo — e o que eu recuso enxergar.",
      quote: "O baralho não fala o destino. Ele devolve a pergunta com mais honestidade do que eu faria sozinho.",
      tagSlug: "tarot",
      homeSlot: "espiritualidade",
      publishedAt: new Date("2026-01-28"),
      productSlugs: ["rider-waite"],
      recommended: "rider-waite",
      content: blocks([
        {
          type: "p",
          text: "Tratei o tarot como máquina de previsões por tempo demais. Frustração garantida: a vida não cabe em 78 lâminas, e o futuro não é um texto pré-impresso. O que o baralho faz bem é outra coisa — nomear arquétipos que já transitam em você.",
        },
        { type: "image", label: "CARTA ABERTA NA MESA" },
        {
          type: "p",
          text: "Quando a pergunta muda de “o que vai ser de mim?” para “o que estou evitando?”, a leitura fica adulta. Menos espetáculo. Mais trabalho interior.",
        },
        {
          type: "quote",
          text: "O baralho não fala o destino. Ele devolve a pergunta com mais honestidade do que eu faria sozinho.",
        },
        {
          type: "p",
          text: "Uso o Rider-Waite porque as imagens são literárias o bastante para conversar com o inconsciente sem precisar de um dicionário secreto. Não é o único caminho. É o que me ensinou a parar de pedir milagre e começar a pedir clareza.",
        },
      ]),
    },
    {
      slug: "oxala-e-a-paciencia-de-comecar-de-novo",
      title: "Oxalá e a paciência de começar de novo",
      excerpt: "O orixá da criação também governa a lentidão sagrada de recomeçar.",
      subtitle:
        "Queria fogo, corte, urgência. Oxalá me ofereceu branco, tempo e a humildade de não acelerar o que ainda está cru.",
      tagSlug: "orixas",
      homeSlot: "espiritualidade",
      publishedAt: new Date("2026-02-11"),
      productSlugs: ["incenso-copal"],
      recommended: "incenso-copal",
      content: blocks([
        {
          type: "p",
          text: "Oxalá não é apenas origem. É a recusa de forçar o fruto. No terreiro, aprendi que tem trabalho que pede palha e água, não espada. Meu temperamento pedia o contrário.",
        },
        { type: "image", label: "BRANCO E PAZ" },
        {
          type: "p",
          text: "Começar de novo, sob essa qualidade, não é apagar o que veio. É permitir que a criação tenha o tempo que a ansiedade nega.",
        },
        {
          type: "quote",
          text: "Paciência, aqui, não é espera passiva. É respeito pelo que ainda está em gestação.",
        },
        {
          type: "p",
          text: "Quando o dia pede pressa, acendo copal, visto a intenção de branco e lembro: nem tudo que importa cabe no relógio que eu escolhi.",
        },
      ]),
    },
    {
      slug: "autoconhecimento-nao-e-autoajuda",
      title: "Autoconhecimento não é autoajuda",
      excerpt: "Uma diferença simples: um dissolve máscaras. O outro costuma vendê-las novas.",
      subtitle:
        "Autoajuda promete a melhor versão de você. Autoconhecimento pergunta se essa versão não é só mais um disfarce.",
      tagSlug: "autoconhecimento",
      homeSlot: "espiritualidade",
      publishedAt: new Date("2026-03-09"),
      productSlugs: ["caibalion", "almofada-meditacao"],
      recommended: "caibalion",
      content: blocks([
        {
          type: "p",
          text: "Não desprezo quem busca alívio. Já busquei. O ponto é outro: a indústria da melhoria pessoal costuma reforçar o eu que sofre, oferecendo um eu mais produtivo, mais magnético, mais iluminado. Troca-se a máscara. O palco continua.",
        },
        { type: "image", label: "ESPELHOS" },
        {
          type: "p",
          text: "Autoconhecimento, no sentido que pratico aqui, é menos flattering. Ele aponta o mecanismo. Mostra a fome por aprovação, o medo de sumir, a fábula de merecimento. Não vende o upgrade. Oferece o chão.",
        },
        {
          type: "quote",
          text: "Só assim você consegue ser quem você quer ser: deixando de ser quem se pensa.",
        },
        {
          type: "p",
          text: "Por isso este espaço mistura relato, símbolo e prática — e desconfia de fórmulas. Se um texto te deixar mais seguro na persona, desconfie. Se te deixar mais honesto, fique.",
        },
      ]),
    },
    {
      slug: "o-caduceu-e-o-caminho-do-meio",
      title: "O caduceu e o caminho do meio",
      excerpt: "Hermes não escolhe um lado. Ensina a circular entre eles sem se perder.",
      subtitle:
        "Polarizei minha vida em sagrado e profano, luz e sombra. O hermetismo me devolveu a ponte.",
      tagSlug: "hermetismo",
      homeSlot: null,
      publishedAt: new Date("2026-03-25"),
      productSlugs: ["caibalion", "kybalion-anotado"],
      recommended: "caibalion",
      content: blocks([
        {
          type: "p",
          text: "O caduceu não é um acessório. Duas serpentes sobem o mesmo eixo. Nenhuma anula a outra. O meio não é mediocridade: é o ponto em que os opostos param de fingir que são inimigos.",
        },
        { type: "image", label: "CADUCEU" },
        {
          type: "p",
          text: "Li o Caibalion como quem procura leis. Fiquei com um ofício: observar correspondências, notar o ritmo, não idolatrar nem a matéria nem o êxtase.",
        },
        {
          type: "quote",
          text: "O caminho do meio não é ausência de tensão. É saber caminhar com ela.",
        },
        {
          type: "p",
          text: "Quando a espiritualidade vira fuga do mundo, ou o mundo vira fuga do espírito, o caduceu lembra: os dois fios são o mesmo trabalho.",
        },
      ]),
    },
    {
      slug: "meditar-nao-e-esvaziar",
      title: "Meditar não é esvaziar: é encontrar",
      excerpt: "Parei de caçar o silêncio perfeito. Passei a sentar com o que já estava ali.",
      subtitle:
        "A instrução “não pense em nada” me sabotou por anos. O que funcionou foi receber o pensamento sem assinar o contrato.",
      tagSlug: "meditacao",
      homeSlot: null,
      publishedAt: new Date("2026-04-14"),
      productSlugs: ["almofada-meditacao"],
      recommended: "almofada-meditacao",
      content: blocks([
        {
          type: "p",
          text: "Eu tratava meditação como um exame: se surgisse pensamento, eu reprovava. Resultado previsível — mais tensão, menos presença. O corpo virava inimigo. A mente, fiscal.",
        },
        { type: "image", label: "ASSENTO VAZIO" },
        {
          type: "p",
          text: "Encontrar, aqui, é permitir que o que está vivo se mostre. Raiva, lista de compras, prece, tédio. Nada disso desqualifica a prática. Fingir o vazio, sim.",
        },
        {
          type: "quote",
          text: "O silêncio útil não é o da mente apagada. É o da mente testemunhada.",
        },
        {
          type: "p",
          text: "Sento. Respiro. Volto. Sem pontuação. Se isso parece pouco, é porque a persona quer espetáculo. A prática pede fidelidade pequena e repetida.",
        },
      ]),
    },
    {
      slug: "o-simbolo-que-habita-o-corpo",
      title: "O símbolo que habita o corpo",
      excerpt: "Simbolismo não é decoração. É linguagem que o corpo entende antes da explicação.",
      subtitle:
        "Antes de compreender um ponto riscado, o corpo já reagia. A teoria veio depois, para não perder o que o gesto sabia.",
      tagSlug: "simbolismo",
      homeSlot: null,
      publishedAt: new Date("2026-04-29"),
      productSlugs: ["incenso-copal", "tarot-marselha"],
      recommended: "tarot-marselha",
      content: blocks([
        {
          type: "p",
          text: "Cresci num mundo que só respeita o que se explica. Símbolo, então, parecia luxo ou superstição. Até notar que eu já vivia cercado deles: a cor da roupa no terreiro, a carta que se recusa a sair do baralho, o incenso que muda o ar da sala.",
        },
        { type: "image", label: "TRAÇO NO CHÃO" },
        {
          type: "p",
          text: "O corpo lê densidade, ritmo, imagem. A mente traduz depois — e às vezes traduz mal. Por isso trato o simbolismo como prática, não como catálogo.",
        },
        {
          type: "quote",
          text: "O símbolo não pede que você acredite. Pede que você preste atenção.",
        },
        {
          type: "p",
          text: "Quando um signo se repete na vida, não apresso o significado. Anoto. Espero. Deixo o corpo confirmar antes do ensaio intelectual.",
        },
      ]),
    },
  ];

  const spiritCreated = [];
  for (const post of spiritPosts) {
    const created = await prisma.post.create({
      data: {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        subtitle: post.subtitle,
        quote: post.quote,
        content: post.content,
        publishedAt: post.publishedAt,
        readingTime: 7,
        kind: PostKind.ARTICLE,
        homeSlot: post.homeSlot,
        categoryId: espiritualidade.id,
        tagId: tag(espiritualidade, post.tagSlug),
        products: {
          create: post.productSlugs.map((slug) => ({
            role: slug === post.recommended ? "recommended" : "related",
            productId: product(slug).id,
          })),
        },
      },
    });
    spiritCreated.push(created);
  }

  await prisma.post.create({
    data: {
      slug: "melhores-baralhos-de-tarot",
      title: "Melhores baralhos de Tarot",
      excerpt:
        "Três caminhos distintos: o clássico ilustrado, a linha crua de Marselha e o uso cotidiano como espelho.",
      subtitle:
        "Não existe o baralho certo. Existe o baralho com o qual você consegue ser honesto.",
      content: blocks([
        {
          type: "p",
          text: "Este guia não ranqueia magia. Compara ferramentas. Cada baralho puxa um tipo de conversa — narrativa, arquetípica ou austera. A escolha é de ofício, não de fetiche.",
        },
      ]),
      publishedAt: new Date("2026-02-20"),
      readingTime: 9,
      kind: PostKind.GUIDE,
      categoryId: guias.id,
      tagId: tag(guias, "guia-tarot"),
      guide: {
        create: {
          ctaTitle: "Pronto para escolher o seu baralho?",
          ctaSubtitle: "Comece pelo clássico se está iniciando. Avance para Marselha quando o símbolo pedir menos ilustração.",
          faqs: {
            create: [
              {
                order: 1,
                question: "Preciso de um baralho consagrado para começar?",
                answer:
                  "Não. Precisa de respeito e de prática. Consagração é rito pessoal; não é pedágio para estudar as cartas.",
              },
              {
                order: 2,
                question: "Posso ler para os outros sendo iniciante?",
                answer:
                  "Pode, com honestidade sobre o seu nível. O tarot como espelho pede ética: você não dita destino, oferece linguagem.",
              },
              {
                order: 3,
                question: "Rider-Waite ou Marselha — por onde começo?",
                answer:
                  "Se as imagens narrativas te ajudam a falar, Rider-Waite. Se você quer linha, cor e menos cena, Marselha. Os dois ensinam. Um de cada vez.",
              },
            ],
          },
          products: {
            create: [
              {
                order: 1,
                productId: product("rider-waite").id,
                bestFor: "Iniciantes",
                level: 3,
                pro: "Imagens narrativas, literatura vasta, fácil de estudar.",
                con: "Pode viciar na cena e atrasar a leitura do arquétipo puro.",
                description:
                  "Ponto de partida sólido. As lâminas menores contam histórias; isso acelera o vocabulário de quem ainda não tem repertório simbólico.",
              },
              {
                order: 2,
                productId: product("tarot-marselha").id,
                bestFor: "Simbolismo",
                level: 4,
                pro: "Síntese visual, tradição longa, menos ruído ilustrativo.",
                con: "Curva mais seca no começo, especialmente nos arcanos menores.",
                description:
                  "Menos teatro, mais estrutura. Bom para quem já entendeu que carta não é vinheta — é signo.",
              },
              {
                order: 3,
                productId: product("caibalion").id,
                bestFor: "Aprofundamento",
                level: 5,
                pro: "Dá linguagem hermética para o que o baralho só aponta.",
                con: "Não substitui a prática com as cartas; é estudo paralelo.",
                description:
                  "Incluo o livro aqui porque muita leitura rasa de tarot se cura com um pouco de princípio: correspondência, ritmo, polaridade.",
              },
            ],
          },
        },
      },
    },
  });

  await prisma.post.create({
    data: {
      slug: "melhores-livros-de-espiritualidade",
      title: "Melhores livros de espiritualidade",
      excerpt:
        "Leitura que dissolve persona, não a que vende uma versão mais brilhante dela.",
      subtitle:
        "Uma estante pequena. Poucos títulos. Muita releitura. O critério é um só: o livro me deixa mais honesto ou mais encenado?",
      content: blocks([
        {
          type: "p",
          text: "Espiritualidade impressa sobra no mercado. Falta livro que não peça adesão a um guru e que sobreviva à segunda leitura, quando o entusiasmo já passou.",
        },
      ]),
      publishedAt: new Date("2026-03-15"),
      readingTime: 8,
      kind: PostKind.GUIDE,
      categoryId: guias.id,
      tagId: tag(guias, "guia-espiritualidade"),
      guide: {
        create: {
          ctaTitle: "Monte uma estante sem pose",
          ctaSubtitle: "Comece por um princípio. Depois, anote. O caderno importa mais que a pilha na mesa de cabeceira.",
          faqs: {
            create: [
              {
                order: 1,
                question: "Preciso ler na ordem “certa”?",
                answer:
                  "Não. Leia o que encontrar eco agora. Releia quando a vida mudar o ângulo. Ordem rígida é outra persona.",
              },
              {
                order: 2,
                question: "E se o livro usar uma linguagem que não é a minha tradição?",
                answer:
                  "Traduza o princípio, não o figurino. Hermetismo, terreiro e silêncio podem conversar se você não idolatrar o vocabulário.",
              },
              {
                order: 3,
                question: "Quantos livros ao mesmo tempo?",
                answer:
                  "Um principal. Talvez um caderno. Acumular título é fácil; metabolizar, não.",
              },
            ],
          },
          products: {
            create: [
              {
                order: 1,
                productId: product("caibalion").id,
                bestFor: "Princípios",
                level: 4,
                pro: "Compacto, reincidente, serve de eixo para outras leituras.",
                con: "Pode ser lido como dogma se você buscar fórmulas.",
                description:
                  "Não é evangelho. É um conjunto de lentes. Uso como pedra de toque: isso que estou vivendo tem correspondência, ritmo, polaridade?",
              },
              {
                order: 2,
                productId: product("kybalion-anotado").id,
                bestFor: "Estudo cotidiano",
                level: 3,
                pro: "Aproxima o princípio da vida comum, sem palco iniciático.",
                con: "Não substitui a experiência de terreiro nem a prática sentada.",
                description:
                  "Para quem já bateu no limite da abstração e precisa de pontes com o dia útil: trabalho, conflito, corpo.",
              },
              {
                order: 3,
                productId: product("rider-waite").id,
                bestFor: "Prática viva",
                level: 3,
                pro: "Tira a espiritualidade da página e coloca na mesa.",
                con: "Sem critério, vira entretenimento oracular.",
                description:
                  "Livro nenhum substitui um diálogo honesto com símbolo. O baralho, usado como espelho, completa a leitura.",
              },
            ],
          },
        },
      },
    },
  });

  await prisma.post.create({
    data: {
      slug: "itens-para-altar",
      title: "Itens para altar",
      excerpt:
        "O essencial para um espaço de prática — sem transformar a casa em loja esotérica.",
      subtitle:
        "Altar não é vitrine. É superfície de atenção. Cabe pouco. Precisa fazer sentido no corpo, não no feed.",
      content: blocks([
        {
          type: "p",
          text: "Antes de comprar, pergunte: isto me ajuda a chegar, ou só me ajuda a parecer que cheguei? O resto deste guia parte dessa tesoura.",
        },
      ]),
      publishedAt: new Date("2026-04-02"),
      readingTime: 7,
      kind: PostKind.GUIDE,
      categoryId: guias.id,
      tagId: tag(guias, "guia-ambiente"),
      guide: {
        create: {
          ctaTitle: "Comece pelo que já está em casa",
          ctaSubtitle: "Um copo d'água e um ponto de silêncio já são altar. O resto é acréscimo, não requisito.",
          faqs: {
            create: [
              {
                order: 1,
                question: "Preciso de um cômodo só para isso?",
                answer:
                  "Não. Precisa de um lugar que você trate com respeito. Uma prateleira basta se a intenção for clara.",
              },
              {
                order: 2,
                question: "Posso misturar terreiro e prática solitária no mesmo espaço?",
                answer:
                  "Pode, com critério e orientação da sua casa, se você a tiver. O essencial é não tratar santo como decoração.",
              },
              {
                order: 3,
                question: "O que não pode faltar?",
                answer:
                  "Limpeza, água, luz (mesmo que mínima) e a sua presença. Incenso e assento são auxiliares.",
              },
            ],
          },
          products: {
            create: [
              {
                order: 1,
                productId: product("incenso-copal").id,
                bestFor: "Limpeza",
                level: 3,
                pro: "Muda o ar da sala e marca o começo do rito.",
                con: "Fumaça demais vira distração ou desculpa estética.",
                description:
                  "Uso copal quando preciso separar o dia útil da prática. Não é obrigatório. É um gongo olfativo.",
              },
              {
                order: 2,
                productId: product("almofada-meditacao").id,
                bestFor: "Corpo",
                level: 4,
                pro: "Permite sentar sem negociar com a dor a cada três minutos.",
                con: "Não substitui postura; só a apoia.",
                description:
                  "Se a prática inclui silêncio sentado, o corpo precisa de pacto. Almofada é pacto, não acessório místico.",
              },
              {
                order: 3,
                productId: product("tarot-marselha").id,
                bestFor: "Consulta",
                level: 2,
                pro: "Cabe no altar sem virar enfeite narrativo.",
                con: "Só faz sentido se você for usar, não exibir.",
                description:
                  "Um baralho no altar é ferramenta. Se ficar meses sem abrir, é decoração — e decoração espiritual cansa a casa.",
              },
            ],
          },
        },
      },
    },
  });

  const relatedProducts = [product("rider-waite"), product("caibalion"), product("incenso-copal")];
  for (const post of spiritCreated.slice(0, 3)) {
    for (const p of relatedProducts) {
      await prisma.postProduct.upsert({
        where: { postId_productId: { postId: post.id, productId: p.id } },
        update: {},
        create: {
          postId: post.id,
          productId: p.id,
          role: "related",
        },
      });
    }
  }

  await prisma.sitePage.create({
    data: {
      slug: "sobre",
      title: "Sobre",
      quote:
        "Todo dia é dia de deixar de ser quem se pensa. Só assim você consegue ser quem você quer ser.",
      themes: JSON.stringify([
        "Autoconhecimento",
        "Espiritualidade",
        "Umbanda",
        "Tarot",
        "Hermetismo",
        "Meditação",
        "Simbolismo",
        "Ego",
      ]),
      body: JSON.stringify([
        "O Mago da Meia Noite não é um mestre nem um guru. É alguém documentando sua própria jornada de autoconhecimento — o que viveu, e o que compreendeu a partir disso.",
        "Nasceu da necessidade de nomear o que acontece quando a persona cansa e algo mais antigo pede passagem. Umbanda, tarot, hermetismo e silêncio são ferramentas — não destinos. Este espaço é testemunho, não palco de iluminação alheia.",
        "Se algo daqui te servir, leve. Se não servir, deixe. A jornada é intransferível; o relato, apenas um lampião na beira do caminho.",
      ]),
    },
  });

  console.log("Seed concluído.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
