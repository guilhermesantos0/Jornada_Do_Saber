import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1, // Ocupa todo o espaço disponível
        backgroundColor: '#FFF', // Cor de fundo branco
        padding: 20, // Espaçamento interno
    },
    header: {
        flexDirection: 'row', // Organiza imagens lado a lado
        justifyContent: 'space-between', // Distribui espaço entre ícones
        alignItems: 'center', // Alinha verticalmente no centro
        marginBottom: 20, // Margem inferior
    },
    tangramIcon: {
        width: 50, // Largura da imagem
        height: 50, // Altura da imagem
    },
    logo: {
        width: 50,
        height: 50,
    },
    title: {
        fontSize: 30, // Tamanho grande para o título
        fontWeight: 'bold', // Negrito
        textAlign: 'center', // Centralizado horizontalmente
        color: '#FF7F00', // Cor laranja do título
        marginBottom: 10, // Margem inferior
    },
    subtitle: {
        fontSize: 16, // Tamanho menor para o subtítulo
        textAlign: 'center',
        color: '#333', // Cinza escuro
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#ADD8E6', // Azul claro
        padding: 15, // Espaçamento interno
        marginVertical: 10, // Margem vertical entre os botões
        borderRadius: 10, // Borda arredondada
        alignItems: 'center', // Centraliza o texto dentro do botão
    },
    buttonText: {
        fontSize: 18, // Tamanho do texto no botão
        color: '#FFF', // Cor do texto branco
        fontWeight: 'bold', // Negrito
    },
    rulesTitle: {
        fontSize: 20, // Tamanho do texto do título de regras
        fontWeight: 'bold',
        color: '#FF7F00', // Cor laranja das regras
        marginTop: 20, // Margem superior antes do título
        marginBottom: 10, // Margem inferior depois do título
    },
    rulesText: {
        fontSize: 14, // Texto menor para as regras
        color: '#333',
        textAlign: 'left', // Alinha o texto das regras à esquerda
    },
    tangramExample: {
        width: '100%', // Largura total da tela
        height: 150, // Altura da imagem exemplo
        marginTop: 20, // Margem superior acima da imagem
        resizeMode: 'contain', // Faz a imagem se ajustar dentro da view sem cortar
    },
});

export default styles;
