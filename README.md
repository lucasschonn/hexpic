# HexPic

### O que é?

HexPic é um projeto bastante curioso, surgido de uma ideia de relance ela consiste basicamente em converter textos em cores, que quando agrupadas podem formar blocos de dados.

Para ter uma ideia melhor do seu funcionamento acesse [Museu de HexPics](https://hexpic.onrender.com/museum.html), nesta página você encontra diversos textos (livros e músicas) codificados em imagens que podem ser guardados e posteriormente lidos no decodificador.

Se quiser criar seus próprios HexPics acesse [HexPic](https://hexpic.onrender.com/index.html) e comece agora mesmo! Toda a página é feita usando HTML, CSS e Javascript puro para melhor compreensão do projeto, assim como o fonte está disponibilizado no GitHub.

### Como funciona?

O processo de conversão é bastante simples e pode ser dividido em quatro etapas:

1. O texto é convertido para o formato hexadecimal, o processo de conversão pode ser feito de maneira fácil utilizando o codificador de texto do Javascript.
2. Em seguida dividimos o bloco de caracteres hexadecimais em clusters de seis dígitos (esta parte é fundamental pois as cores utilizadas para conversão são baseadas em cores hexadecimais e nisto usamos seis dígitos para economizar espaço de tela).
3. O próximo passo consiste em criar um canvas e sequenciar os clusters criando para cada cluster um pixel de cores diferentes.
4. Ao término do processo o canvas pode ser baixado como formato .png e desta forma pode armazenar informações que posteriormente podem ser decodificadas usando o mesmo processo reverso.

### Problemas identificados

O processo de codificação tem alguns percalços como por exemplo o arredondamento de clusters. Nem todos os caracteres possuem o mesmo tamanho de caracteres em hexadecimal quando convertidos (comparável aos seus bytes correspondentes) portanto é difícil ter um número redondo de caracteres no último cluster. Este problema pode ser solucionado populando o último cluster com espaços vazios, que podem ser interpretados pelo codificador e decodificador.

Outro problema semelhante é o arredondamento de pixels na tela de saída. Para uma imagem ideal o número de pixels totais teria que ter uma raiz quadrada perfeita, o que é bastante raro. Este problema pode ser de caráter estético apenas, visto que não atrapalha a codificação. Para minimizar seus efeitos é calculado o tamanho dos clusters (futuros pixels) e então é obtido a raiz quadrada arredondada para cima. Em cima de uma tela com as dimensões adequadas os pixels serão distribuídos da maneira mais harmoniosa possível.

Por fim foi percebido que a edição dos .pngs pode perder tonalidades da imagem o que pode corromper os dados, não foi possível identificar se o problema pode ser contornado na geração de imagem ou na criação de um processo de recuperação (mais provável que este último seja a solução mais adequada).
