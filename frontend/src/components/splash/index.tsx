import ReactLoading from 'react-loading';
import './index.scss';

const Splash: React.FC = () => {
  return (
    <div id="splash">
      <div className="welcome text-primary-darkest">Carregando</div>
      <ReactLoading
        className="loading"
        type="spinningBubbles"
        color="#55bbff"
        height={100}
        width={100}
      />
    </div>
  );
};
export { Splash };
