import is from '@sindresorhus/is';
import { Router } from 'express';
import { awardService } from '../services/awardService';
import { login_required } from '../middlewares/login_required';

const awardRouter = Router();

// award 생성
awardRouter.post('/award', login_required, async (req, res, next) => {
  try {
    //request body에 json-content 있는지 확인
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정 해주세요'
      );
    }

    // body에 담길 내용
    const { title, description } = req.body;

    if (!title || !description) {
      return next(new Error('수상 이력을 작성해주세요!'));
    }
    // 데이터를 award DB에 추가하기
    const newAward = await awardService.addAward({
      userId : req.currentUserId, // jwt token -> user_id
      title,
      description,
    });

    if (newAward.errorMessage) {
      throw new Error(newAward.errorMessage);
    }
    // success status: 201
    res.status(201).json(newAward);
  } catch (error) {
    next(error);
  }
});

// award 조회
awardRouter.get('/award/:userId', login_required, async (req, res, next) => {
  try {
    
    const awards = await awardService.getAward({userId : req.params.userId});
    res.status(200).send(awards);
  } catch (error) {
    next(error);
  }
});

// award 수정
awardRouter.put('/award/:awardId', login_required, async (req, res, next) => {
  try {
    //request body에 json type contents 있는지 check
    if(is.emptyObject(req.body)) {
      throw new Error('headers의 Content-Type을 application/json으로 설정 해주세요');
    }

    //수정할 award id 가져오기
    const awardId = req.params.awardId;

    //수정할 contents
    const title = req.body.title ?? null;
    const description = req.body.description ?? null;

    const toUpdate = { title, description};

    const updatedAward = await awardService.setAward({ awardId, toUpdate });
    if (updatedAward.errorMessage) {
      throw new Error(updatedAward.errorMessage);
    }

    res.status(200).json(updatedAward);
  } catch (error) {
    next(error);
  }
});

// award 삭제
awardRouter.delete("/award/:awardId", login_required, async function(req,res,next) {
  try{
    const awardId = req.params.awardId;
    const deletedAward = await awardService.deleteAward({ awardId });

    if (deletedAward.errorMessage) {
      throw new Error(deletedAward.errorMessage);
    }
    res.status(200).json(deletedAward);

  }catch(error){
    next(error)
  }
 })

export { awardRouter }